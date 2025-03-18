import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class MissionModalComponent {
  @Input() displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  mission = {
    titre: '',
    chef: null,
    dateDebut: null,
    duree: null,
    description: '' 
  };

  chefs = [
    { name: 'Chef 1', code: 'C1' },
    { name: 'Chef 2', code: 'C2' }
  ];

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

