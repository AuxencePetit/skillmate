import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mission, NecessiterMissionComp } from '../models/mission.model';
import { Personnel, Competence } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { CompetenceService } from '../services/competence.service';
import { forkJoin } from 'rxjs';
import { MissionUserService } from '../services/mission-user.service';



// PrimeNG imports
import { TagModule } from 'primeng/tag';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrl: './team-selection.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    BadgeModule,
    TagModule,
    ListboxModule,
    ButtonModule,
    ChipModule,
    ToastModule
  ]
})
export class TeamSelectionComponent implements OnInit {


  @Input() mission!: Mission;
  ListePersonnel: Personnel[] = [];
  competencesNecessaires: NecessiterMissionComp[] = [];
  personnelAffichage: PersonnelAffichage[] = [];
  personnelSelectionnes: Personnel[] = [];

  constructor(
    private competenceService: CompetenceService,
    private personnelService: PersonnelService,
    private missionUserService: MissionUserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (!this.mission) return; // Sécurité
    this.competenceService.getCompetencesByMissionId(this.mission.idMission).subscribe((competences: any[]) => {
      this.competencesNecessaires = competences.map(c => ({
        competence: {
          idComp: c.idComp,
          libelle: c.libelle,
          description: c.description,
          idCategorie: c.idCategorie
        },
        idMission: c.idMission,
        nombre_personne: c.nombre_personne
      }));

      this.missionUserService.getPersonnelByMission(this.mission.idMission).subscribe((personnels: Personnel[]) => {
        if (!personnels.length) {
          this.personnelSelectionnes = [];
          this.loadPersonnelsEtScores();
          return;
        }
        // Récupère les compétences pour chaque personnel déjà sélectionné
        const obs = personnels.map(p => this.competenceService.getCompetencesByUserId(p.idUtilisateur));
        forkJoin(obs).subscribe((allCompetences: Competence[][]) => {
          this.personnelSelectionnes = personnels.map((p, idx) => ({
            ...p,
            competences: allCompetences[idx] || []
          }));
          this.loadPersonnelsEtScores(); // <-- Appelle ici, après avoir TOUT chargé
        });

      });
    });
  }

  // ...existing code...

  loadPersonnelsEtScores() {
    this.personnelService.getPersonnels().subscribe((personnels: Object) => {
      this.ListePersonnel = personnels as Personnel[];

      const obs = this.ListePersonnel.map(personnel =>
        this.competenceService.getCompetencesByUserId(personnel.idUtilisateur)
      );

      forkJoin(obs).subscribe((allCompetences: Competence[][]) => {
        const idsSelectionnes = this.personnelSelectionnes.map(p => p.idUtilisateur);
        const manque = this.getManqueParCompetence();

        // === DEBUG : Vérification des correspondances ===
        console.log('--- DEBUG ---');
        console.log('competencesNecessaires:', this.competencesNecessaires.map(c => ({
          idComp: c.competence.idComp,
          libelle: c.competence.libelle
        })));
        this.ListePersonnel.forEach((personnel, idx) => {
          const competences = allCompetences[idx] || [];
          console.log(`Personnel: ${personnel.nom} ${personnel.prenom} (${personnel.idUtilisateur})`);
          console.log('Compétences:', competences.map(c => c.idComp));
        });
        // === FIN DEBUG ===

        this.personnelAffichage = this.ListePersonnel
          .filter(personnel => !idsSelectionnes.includes(personnel.idUtilisateur))
          .map((personnel) => {
            // Trouver l'index de la personne dans ListePersonnel (tableau complet)
            const idxOriginal = this.ListePersonnel.findIndex(p => p.idUtilisateur === personnel.idUtilisateur);
            const competences = allCompetences[idxOriginal] || [];
            const idsNecessaires = this.competencesNecessaires.map(c => String(c.competence.idComp));
            // DEBUG : Vérification du mapping
            console.log(`idsNecessaires pour ${personnel.nom}:`, idsNecessaires);
            const competencesCommunes = competences.filter(c => idsNecessaires.includes(String(c.idComp)));
            console.log(`competencesCommunes pour ${personnel.nom}:`, competencesCommunes.map(c => c.idComp));
            const scoreQuota = competencesCommunes.reduce((sum, c) => sum + (manque[String(c.idComp)] ?? 0), 0);
            return {
              ...personnel,
              competences,
              scorePertinence: competencesCommunes.length,
              competencesCommunes,
              scoreQuota
            };
          });
        this.personnelAffichage.sort((a, b) =>
          b.scoreQuota - a.scoreQuota || b.scorePertinence - a.scorePertinence
        );
      });
    });
  }

  // ...existing code...

  addPersonnelToMission(personnel: Personnel) {
    this.personnelSelectionnes.push(personnel);
    this.personnelAffichage = this.personnelAffichage.filter(p => p.idUtilisateur !== personnel.idUtilisateur);
    this.missionUserService.addPersonnelToMission(personnel.idUtilisateur, this.mission.idMission).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: `Personnel ${personnel.nom} ${personnel.prenom} ajouté à la mission`
      });
      this.loadPersonnelsEtScores(); // <-- Ajoute ceci
    });
  }

  removePersonnelFromMission(personnel: Personnel) {
    this.personnelSelectionnes = this.personnelSelectionnes.filter(p => p.idUtilisateur !== personnel.idUtilisateur);
    this.personnelAffichage.push(personnel as PersonnelAffichage);
    this.personnelAffichage.sort((a, b) =>
      b.scoreQuota - a.scoreQuota || b.scorePertinence - a.scorePertinence
    );
    this.missionUserService.removePersonnelFromMission(personnel.idUtilisateur, this.mission.idMission).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: `Personnel ${personnel.nom} ${personnel.prenom} retiré de la mission`
      });
      this.loadPersonnelsEtScores(); // <-- Ajoute ceci
    });
  }

  getQuotaProgress(idComp: number | string): number {
    return this.personnelSelectionnes.filter(personnel =>
      Array.isArray(personnel.competences) &&
      personnel.competences.some(c => String(c.idComp) === String(idComp))
    ).length;
  }

  private getManqueParCompetence(): { [idComp: string]: number } {
    const manque: { [idComp: string]: number } = {};
    for (const comp of this.competencesNecessaires) {
      const idComp = String(comp.competence.idComp);
      const quota = comp.nombre_personne;
      const deja = this.getQuotaProgress(idComp);
      manque[idComp] = Math.max(0, quota - deja);
    }
    return manque;
  }
}

interface PersonnelAffichage extends Personnel {
  scorePertinence: number;
  competencesCommunes: Competence[];
  scoreQuota: number;
}
