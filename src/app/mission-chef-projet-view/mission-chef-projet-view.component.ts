import { Component } from '@angular/core';

import { Competence } from '../models/personnel.model';
import { Mission } from '../models/mission.model';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { MissionService } from '../services/mission.service';
import { CompetenceService } from '../services/competence.service';
import { MissionUserService } from '../services/mission-user.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-mission-chef-projet-view',
  imports: [],
  templateUrl: './mission-chef-projet-view.component.html',
  styleUrl: './mission-chef-projet-view.component.scss'
})
export class MissionChefProjetViewComponent {
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;
  competencesMission!: Competence[];
  missionUser!: Mission;
  equipe: Personnel[] = [];
  allPersonnels: Personnel[] = [];
  constructor(
    private personnelsService: PersonnelService,
    private competenceService: CompetenceService,
    private missionUserService: MissionUserService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.userInfo = this.sessionService.getUserInfo();
    this.competenceService.getCompetences().subscribe((competences: Competence[]) => {
      this.competencesMission = competences;
    });
    this.personnelsService.getPersonnels().subscribe((data: any) => {
      this.allPersonnels = data;
      for (let personnel of this.allPersonnels) {
      this.competenceService.getCompetencesByUserId(personnel.idUtilisateur).subscribe((data: any) => {
        personnel.competences = data;

      });
    }
    });
    this.missionUserService.getMissionUser(this.userInfo!.idUtilisateur).subscribe((data: any) => {
      this.missionUser = data;
      this.missionUserService.getPersonnelByMission(this.missionUser.idMission).subscribe((data: any) => {
        this.equipe = data;
      });
    });
}
  appendPersonelToEquipe(personnel: Personnel) {
    this.equipe.push(personnel);
  }

  removePersonnelFromEquipe(personnel: Personnel) {
    this.equipe = this.equipe.filter((p) => p !== personnel);
  }

  saveEquipe() {
    this.equipe.forEach((personnel) => {
      this.missionUserService.addPersonnelToMission(personnel.idUtilisateur, this.missionUser.idMission).subscribe();
    });
  }

  orderPersonnelByMatchingMissionCompetences(personnel: Personnel) {
    let matchingCompetences = 0;
    for (let competence of (personnel.competences || [])) {
      if (this.competencesMission.includes(competence)) {
        matchingCompetences++;
      }
    }
    return matchingCompetences;
  }

  nbPersonnelMatchingACompetence(competence: Competence) {
    return this.equipe.filter((personnel) => personnel.competences && personnel.competences.includes(competence)).length;
  }
}
