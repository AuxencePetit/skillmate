import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mission, NecessiterMissionComp } from '../models/mission.model';
import { Personnel, Competence } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { CompetenceService } from '../services/competence.service';
import { forkJoin } from 'rxjs';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ListboxModule } from 'primeng/listbox';

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
    ListboxModule
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
  ) {}

  ngOnInit() {
    if (!this.mission) return; // Sécurité

    this.competenceService.getCompetencesByMissionId(this.mission.idMission).subscribe((competences: NecessiterMissionComp[]) => {
      this.competencesNecessaires = competences;
      this.loadPersonnelsEtScores();
    });
  }

  loadPersonnelsEtScores() {
    this.personnelService.getPersonnels().subscribe((personnels: Object) => {
      this.ListePersonnel = personnels as Personnel[];

      const obs = this.ListePersonnel.map(personnel =>
        this.competenceService.getCompetencesByUserId(personnel.idUtilisateur)
      );

      forkJoin(obs).subscribe((allCompetences: Competence[][]) => {
        this.personnelAffichage = this.ListePersonnel.map((personnel, idx) => {
          const competences = allCompetences[idx] || [];
          const idsNecessaires = this.competencesNecessaires.map(c => String((c as any).idComp ?? c.competence?.idComp));
          const competencesCommunes = competences.filter(c => idsNecessaires.includes(String(c.idComp)));
          return {
            ...personnel,
            competences,
            scorePertinence: competencesCommunes.length,
            competencesCommunes
          };
        });
        this.personnelAffichage.sort((a, b) => b.scorePertinence - a.scorePertinence);
      });
    });
  }
}

interface PersonnelAffichage extends Personnel {
  scorePertinence: number;
  competencesCommunes: Competence[];
}
