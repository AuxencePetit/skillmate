import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { PersonnelService } from './personnel.service'; 
import { PersonnelService } from '../../../services/personnel.service';

import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission-modal',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.scss']
})
export class MissionModalComponent implements OnInit {
  @Input() displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  mission = {
    titre: '',
    chef: null,
    dateDebut: null,
    duree: null,
    description: '' 
  };

  chefs: any[] = [];

  constructor(private personnelService: PersonnelService) {} // Injectez le service

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.personnelService.recupererEmployees().subscribe(
      (data) => {
        this.chefs = data.map((employee: { nom: any; prenom: any; idUtilisateur: any; }) => ({
          name: `${employee.nom} ${employee.prenom}`,
          code: employee.idUtilisateur
        }));
        console.log('Chefs récupérés :', this.chefs); // Vérifiez les données
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés:', error);
      }
    );
  }

  showModal() {
    this.displayModal = true;
    this.displayModalChange.emit(this.displayModal);  
  }

  closeModal() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  onSubmit() {
    console.log(this.mission);
    this.closeModal(); 
  }
}