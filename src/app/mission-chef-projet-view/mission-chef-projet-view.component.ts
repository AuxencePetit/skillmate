
import { Component, Input, input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompMissionModalComponent } from '../core/modale/comp-mission-modal/comp-mission-modal.component';

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
    SelectModule,
    CompMissionModalComponent
  ],
  templateUrl: './mission-chef-projet-view.component.html',
  styleUrl: './mission-chef-projet-view.component.scss'
})
export class MissionChefProjetViewComponent {
editCompetence(_t19: any) {
throw new Error('Method not implemented.');
}
deleteCompetence(_t19: any) {
throw new Error('Method not implemented.');
}
  competencesNecessaires: NecessiterMissionComp[] = [];
  Personnels: Personnel[] = [];
  @Output() mission: Mission | null = null;
  isModalVisible: boolean = false;
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;

  constructor(
    private personnelsService: PersonnelService,
    private competenceService: CompetenceService,
    private missionUserService: MissionUserService,
    private sessionService: SessionService
  ) {}
  ngOnInit() {
    this.userInfo = this.sessionService.getUserInfo();
    if (!this.userInfo) {
      // Redirige si non connecté
      return;
    }
    this.missionUserService.getMissionUser(this.userInfo!.idUtilisateur).subscribe((missions: Mission[]) => {
      this.mission = missions[0];
      console.log('Mission reçue :', this.mission);
      this.updateCompetences();
    });
  }
  openModal() {
    this.isModalVisible = true;
  }
  onModalClose() {
    this.isModalVisible = false;
    this.updateCompetences();
  }

  updateCompetences() {
    if (this.mission) {
      this.competenceService.getCompetencesByMissionId(this.mission.idMission).subscribe((competences: NecessiterMissionComp[]) => {
        this.competencesNecessaires = competences;
        console.log('Compétences nécessaires :', this.competencesNecessaires);
      });
    }
  }
}
