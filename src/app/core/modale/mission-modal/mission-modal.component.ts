import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonnelService } from '../../../services/personnel.service';
import { MissionService } from '../../../services/mission.service';

//import primeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Personnel } from '../../../models/personnel.model';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { Mission } from '../../../models/mission.model';



@Component({
  selector: 'app-mission-modal',
  standalone: true,
  imports: [
    DialogModule,
    SelectModule,
    DatePickerModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
  ],
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.scss'],
})
export class MissionModalComponent implements OnInit {
  @Input() displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<void>();

  mission = {
    titre: '',
    chef: {} as Personnel,
    dateDebut: new Date(), // date par défaut
    duree: 0,
    description: '',
  };

  chefs: Personnel[] = []; // Liste des gens disponibles pour etre chef de projet
  selectedChef: Personnel | null = null; // Chef sélectionné
  missions: Mission[] | undefined;

  constructor(
    private personnelService: PersonnelService,
    private missionService: MissionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.personnelService.recupererEmployees().subscribe(
      (response: Personnel[]) => {
        this.chefs = response
      });
  }

  onSubmit() {
    if (
      !this.mission.titre ||
      !this.mission.dateDebut ||
      !this.mission.duree ||
      !this.mission.description ||
      !this.mission.chef
    ) {
      console.error('Tous les champs sont requis');
      return;
    }

    const duree = Number(this.mission.duree);
    const formattedDate = this.formatToDateOnly(this.mission.dateDebut); // Formater la date
    const missionData = {
      nom_mission: this.mission.titre,
      description: this.mission.description,
      date_debut: formattedDate, // Utiliser la date formatée
      duree: duree
    };


    // Envoyez backend
    this.missionService.createMission(missionData,this.mission.chef.idUtilisateur).subscribe(
      (response) => {
        console.log('Mission créée avec succès :', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la mission :', error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Mission créée avec succès',
    });
  }

  // Méthode pour formater la date au format YYYY-MM-DD en string
  formatToDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  showModal() {
    this.displayModal = true;
    this.displayModalChange.emit(this.displayModal);
  }

  closeModal() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
    this.modalClosed.emit();
  }
}
