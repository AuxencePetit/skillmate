// Angular imports
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//import primeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { Mission } from '../../../models/mission.model';
import { NecessiterMissionComp } from '../../../models/mission.model';
import { Competence } from '../../../models/personnel.model';
import { MissionUserService } from '../../../services/mission-user.service';
import { CompetenceService } from '../../../services/competence.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-comp-mission-modal',
  imports: [
    InputTextModule,
    DialogModule,
    SelectModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    DatePickerModule,
    TagModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    CommonModule
  ],
  templateUrl: './comp-mission-modal.component.html',
  styleUrl: './comp-mission-modal.component.scss'
})
export class CompMissionModalComponent implements OnInit {

  @Input() displayModal: boolean = false;
  @Input() mission!: Mission;
  @Output() displayModalChange = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<void>();

  competences: Competence[] = [];
  selectedCompetence: Competence | null = null;
  numberOfPersonnelNeeded: number = 1;
  NecessiterMissionComp: NecessiterMissionComp | null = null;

  constructor(
    private competenceService: CompetenceService,
    private missionUserService: MissionUserService,
    private messageService: MessageService,
  ){
    this.competenceService.getCompetences().subscribe(
      (competences: Competence[]) => {
        this.competences = competences;
      },
      (error) => {
        console.error('Error fetching competences:', error);
      }
    );
  }

  ngOnInit() {
    // Récupère d'abord toutes les compétences
    this.competenceService.getCompetences().subscribe(
      (competences: Competence[]) => {
        // Puis récupère les compétences déjà attribuées à la mission
        this.competenceService.getCompetencesByMissionId(this.mission.idMission).subscribe(
          (missionComps: any[]) => {
            const idsAttribues = missionComps.map(c => c.idComp);
            // Filtre pour ne garder que celles non attribuées
            this.competences = competences.filter(c => !idsAttribues.includes(c.idComp));
          }
        );
      },
      (error) => {
        console.error('Error fetching competences:', error);
      }
    );
  }
  closeModal() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
    this.modalClosed.emit();
  }

  onSubmit() {
    this.competenceService.addCompetenceToMission(this.mission.idMission, this.selectedCompetence!.idComp, this.numberOfPersonnelNeeded).subscribe(
      (response) => {
        console.log('Compétence ajoutée à la mission avec succès:', response);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Compétence ajoutée à la mission avec succès' });
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la compétence à la mission :', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout de la compétence à la mission' });
      }
    );
  }
}
