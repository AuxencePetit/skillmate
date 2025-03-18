import { Component } from '@angular/core';

import { Competence } from '../models/personnel.model';
import { Mission } from '../models/mission.model';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { MissionService } from '../services/mission.service';
import { CompetenceService } from '../services/competence.service';

@Component({
  selector: 'app-mission-chef-projet-view',
  imports: [],
  templateUrl: './mission-chef-projet-view.component.html',
  styleUrl: './mission-chef-projet-view.component.scss'
})
export class MissionChefProjetViewComponent {
  competencesMission!: Competence[];
  missionUser!: Mission;
  equipe: Personnel[] = [];
  allPersonnels: Personnel[] = [];
  constructor(
    private personnelsService: PersonnelService,
    private missionService: MissionService,
    private competenceService: CompetenceService
  ) {}

  ngOnInit() {
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


 


}
  appendPersonelToEquipe(personnel: Personnel) {
    this.equipe.push(personnel);
  }

  removePersonnelFromEquipe(personnel: Personnel) {
    this.equipe = this.equipe.filter((p) => p !== personnel);
  }

  saveEquipe() {
    this.missionService.updateMission(this.missionUser).subscribe((data: any) => {
      console.log(data);
    });
  }
}
