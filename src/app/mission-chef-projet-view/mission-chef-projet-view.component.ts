
import { Component, Input, input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompMissionModalComponent } from '../core/modale/comp-mission-modal/comp-mission-modal.component';
import { CompSelectionComponent } from '../comp-selection/comp-selection.component';
import { TeamSelectionComponent } from '../team-selection/team-selection.component';
import { MissionOverviewComponent } from '../mission-overview/mission-overview.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
import { MissionService } from '../services/mission.service';

//primeng
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mission-chef-projet-view',
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    TableModule,
    SelectModule,
    StepsModule,
    CompSelectionComponent,
    TeamSelectionComponent,
    MissionOverviewComponent,
    ToastModule
  ],
  templateUrl: './mission-chef-projet-view.component.html',
  styleUrl: './mission-chef-projet-view.component.scss'
})
export class MissionChefProjetViewComponent {

  active: number = 0;
  customBtnLabel: string = 'Suivant';
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;
  items: MenuItem[] = [];
  @Output() mission: Mission | null = null;
  personnelSelectionnes: Personnel[] = [];
  competencesNecessaires: NecessiterMissionComp[] = [];



  onPersonnelSelectionnesChange(list: Personnel[]) {
    this.personnelSelectionnes = list;
  }
  onCompetencesNecessairesChange(list: NecessiterMissionComp[]) {
    this.competencesNecessaires = list;
  }

  constructor(
    private missionUserService: MissionUserService,
    private sessionService: SessionService,
    private missionService: MissionService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.items = [
      {
        label: 'Les compétences',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.active = 0;
        }
      },
      {
        label: 'L\'équipe',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.active = 1;
        }
      },
      {
        label: 'Valider la mission',
        icon: 'pi pi-fw pi-plus',
        command: () => {
          this.active = 2;
        }
      }
    ];
    this.userInfo = this.sessionService.getUserInfo();
    console.log('User info :', this.userInfo);
    this.missionUserService.getMissionUser(this.userInfo!.idUtilisateur).subscribe((missions: Mission[]) => {
      this.mission = missions[0];
      console.log('Mission reçue :', this.mission);
    });
  }
  onPrevious() {
    console.log('active :', this.active);
    if (this.active > 0) {
      this.customBtnLabel = 'Suivant';
      this.active--;
    }
  }
  onNext() {
    console.log('active :', this.active);
    if (this.active < 2) {
      this.active++;
      this.customBtnLabel = (this.active === 2) ? 'Valider les préparatifs' : 'Suivant';
    } else if (this.active === 2) {
      // Dernière étape : valider la mission
      this.validatePreparation();
    }
  }
  validatePreparation() {
    if (!this.mission) return;
    this.missionService.updateMissionStatus(this.mission.idMission, 'Planifiée').subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Mission mise à jour avec succès !'
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/mission']);
        });
      }
    );
  }
}

