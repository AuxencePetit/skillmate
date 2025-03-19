import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonnelService } from '../../../services/personnel.service';
import { MissionService } from '../../../services/mission.service';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

// Définir un type pour chef
interface Chef {
  name: string;
  code: number;
}

@Component({
  selector: 'app-mission-modal',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.scss'],
})
export class MissionModalComponent implements OnInit {
  @Input() displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  mission = {
    titre: '',
    chef: {} as Chef, // Initialiser objet de type Chef
    dateDebut: new Date(), // date par défaut
    duree: 0,
    description: '',
  };

  chefs: Chef[] = [];

  constructor(
    private personnelService: PersonnelService,
    private missionService: MissionService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.personnelService.recupererEmployees().subscribe(
      (data) => {
        this.chefs = data.map(
          (employee: { nom: any; prenom: any; idUtilisateur: any }) => ({
            name: `${employee.nom} ${employee.prenom}`,
            code: employee.idUtilisateur,
          })
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés:', error);
      }
    );
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

    const formattedDate = this.formatDate(this.mission.dateDebut);

    const duree = Number(this.mission.duree);

    const missionData = {
      nom_mission: this.mission.titre,
      description: this.mission.description,
      date_debut: formattedDate,
      duree: duree,
      idUtilisateur: this.mission.chef.code,
    };

    // Envoyez backend
    this.missionService.createMission(missionData).subscribe(
      (response) => {
        console.log('Mission créée avec succès :', response);
        this.closeModal();
      },
      (error) => {
        console.error('Erreur lors de la création de la mission :', error);
      }
    );
  }

  // Méthode pour formater la date au format YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  showModal() {
    this.displayModal = true;
    this.displayModalChange.emit(this.displayModal);
  }

  closeModal() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }
}
