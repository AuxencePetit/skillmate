import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission, NecessiterMissionComp } from '../models/mission.model';
import { Competence, Personnel } from '../models/personnel.model';
import { MissionUserService } from '../services/mission-user.service';
import { CompetenceService } from '../services/competence.service';
import { TableModule } from 'primeng/table';

//primeng
import { ChipModule } from 'primeng/chip';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mission-overview',
  imports: [
    CommonModule,
    ChipModule,
    TableModule
  ],
  templateUrl: './mission-overview.component.html',
  styleUrl: './mission-overview.component.scss'
})
export class MissionOverviewComponent implements OnInit {

  @Input() mission!: Mission | null;
  equipe! : Personnel[];
  competences! : NecessiterMissionComp[];

  constructor(private missionUserService: MissionUserService, private competenceService: CompetenceService) {}

  ngOnInit(): void {
    console.log(this.mission);
    this.competenceService.getCompetencesByMissionId(this.mission?.idMission!).subscribe((competences: any[]) => {
      this.competences = competences.map(c => ({
        competence: {
          idComp: c.idComp,
          libelle: c.libelle,
          description: c.description,
          idCategorie: c.idCategorie
        },
        idMission: c.idMission,
        nombre_personne: c.nombre_personne
      }));
    }
    );
    this.missionUserService.getPersonnelByMission(this.mission!.idMission).subscribe((equipe: Personnel[]) => {
      // Charger les compétences pour chaque membre de l'équipe
      const obs = equipe.map(personnel =>
        this.competenceService.getCompetencesByUserId(personnel.idUtilisateur)
      );
      forkJoin(obs).subscribe((allCompetences: Competence[][]) => {
        this.equipe = equipe.map((p, idx) => ({
          ...p,
          competences: allCompetences[idx] || []
        }));
      });
    });
  }

  getCompetenceCommune(user: Personnel): Competence[] {
    const competencesCommune: Competence[] = [];
    this.competences.forEach((competence) => {
      if (user.competences!.some((c) => c.idComp === competence.competence.idComp)) {
        competencesCommune.push(competence.competence);

      }
    });
    return competencesCommune;
  }
}
