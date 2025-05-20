import { Component, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompMissionModalComponent } from '../core/modale/comp-mission-modal/comp-mission-modal.component';

//models
import { Mission } from '../models/mission.model';
import { Personnel } from '../models/personnel.model';
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
  selector: 'app-comp-selection',
  imports: [DialogModule,
      ButtonModule,
      InputTextModule,
      InputNumberModule,
      FormsModule,
      TableModule,
      SelectModule,
      CompMissionModalComponent],
  templateUrl: './comp-selection.component.html',
  styleUrl: './comp-selection.component.scss'
})
export class CompSelectionComponent {
  competencesNecessaires: NecessiterMissionComp[] = [];
    @Input() mission: Mission | null = null;
    isModalVisible: boolean = false;
    userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;

    constructor(
      private competenceService: CompetenceService,
      private sessionService: SessionService
    ) {}
    ngOnInit() {
      this.userInfo = this.sessionService.getUserInfo();
      this.updateCompetences();
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
    deleteCompetence(idCompetence: number): void {
      this.competenceService.deleteCompetenceFromMission(this.mission!.idMission, idCompetence).subscribe(() => {
        console.log('Compétence supprimée de la mission');
        this.updateCompetences();
      });
    }
}
