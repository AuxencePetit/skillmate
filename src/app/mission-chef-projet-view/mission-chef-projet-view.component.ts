
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//models
import { Competence } from '../models/personnel.model';
import { Mission } from '../models/mission.model';
import { Personnel } from '../models/personnel.model';
import { AffecterPersMission } from '../models/mission.model';
import { NecessiterMissionComp } from '../models/mission.model';

//services
import { PersonnelService } from '../services/personnel.service';
import { CompetenceService } from '../services/competence.service';
import { MissionUserService } from '../services/mission-user.service';
import { SessionService } from '../services/session.service';

//primeng
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-mission-chef-projet-view',
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    TableModule,
    SelectModule
  ],
  templateUrl: './mission-chef-projet-view.component.html',
  styleUrl: './mission-chef-projet-view.component.scss'
})
export class MissionChefProjetViewComponent {

  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;
  competencesMission!: NecessiterMissionComp[];
  allCompetences!: Competence[];
  missionUser!: Mission;
  equipe: AffecterPersMission[] = [];
  allPersonnels: Personnel[] = [];
  visible: boolean = false;

  //variables pour le dialog
  selectedCompetence!: Competence;
  nbPersonnel: number = 1;


  constructor(
    private personnelsService: PersonnelService,
    private competenceService: CompetenceService,
    private missionUserService: MissionUserService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.userInfo = this.sessionService.getUserInfo();
    this.missionUserService.getMissionUser(this.userInfo!.idUtilisateur).subscribe((mission: Mission) => {
      this.missionUser = mission;
      this.competenceService.getCompetencesByMissionId(this.missionUser.idMission).subscribe((competences: NecessiterMissionComp[]) => {
        this.competencesMission = competences;
      });
    }
    );

    this.competenceService.getCompetences().subscribe((competences: Competence[]) => {
      this.allCompetences = competences;
    });

    this.personnelsService.getPersonnels().subscribe((personnels: any) => {
      this.allPersonnels = personnels;
    });

  }
  appendCompetence(competence: Competence) {
    this.competencesMission.push({
      competence,
      idMission: this.missionUser.idMission,
      nombre_personne: this.nbPersonnel
    });
  }

  showDialog() {
    this.visible = true;
  }
}
