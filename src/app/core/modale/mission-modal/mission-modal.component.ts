import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PersonnelService } from '../../../services/personnel.service';
import { MissionService } from '../../../services/mission.service'; // Importez le service Mission
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
    FormsModule,
  ],
  templateUrl: './mission-modal.component.html',
  styleUrls: ['./mission-modal.component.scss'],
})
export class MissionModalComponent implements OnInit {
  @Input() displayModal: boolean = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  mission = {
    titre: '', // Chaîne de caractères
    chef: null, // Peut rester null pour l'instant
    dateDebut: new Date(), // Initialisez avec une date par défaut
    duree: 0, // Initialisez avec un nombre par défaut
    description: '', // Chaîne de caractères
  };

  chefs: any[] = [];

  constructor(
    private personnelService: PersonnelService,
    private missionService: MissionService // Injectez le service Mission
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.personnelService.recupererEmployees().subscribe(
      (data) => {
        this.chefs = data.map((employee: { nom: any; prenom: any; idUtilisateur: any; }) => ({
          name: `${employee.nom} ${employee.prenom}`,
          code: employee.idUtilisateur,
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés:', error);
      }
    );
  }

  // onSubmit() {
  //   // Vérifiez que les champs sont valides
  //   if (!this.mission.titre || !this.mission.dateDebut || !this.mission.duree || !this.mission.description) {
  //     console.error('Tous les champs sont requis');
  //     return;
  //   }
  
  //   // Formatez la date au format attendu par le backend (YYYY-MM-DD)
  //   const formattedDate = this.formatDate(this.mission.dateDebut);
  
  //   // Assurez-vous que la durée est un nombre
  //   const duree = Number(this.mission.duree);
  
  //   // Créez l'objet missionData avec les types corrects
  //   const missionData = {
  //     nom_mission: this.mission.titre,
  //     description: this.mission.description,
  //     date_debut: formattedDate, // Doit être une chaîne de caractères
  //     duree: duree, // Doit être un nombre
  //   };
  
  //   // Envoyez les données au backend
  //   this.missionService.createMission(missionData).subscribe(
  //     (response) => {
  //       console.log('Mission créée avec succès :', response);
  //       this.closeModal();
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la création de la mission :', error);
  //     }
  //   );
  // }

  onSubmit() {
    // Vérifiez que les champs sont valides
    if (!this.mission.titre || !this.mission.dateDebut || !this.mission.duree || !this.mission.description) {
      console.error('Tous les champs sont requis');
      return;
    }
  
    // Formatez la date au format attendu par le backend (YYYY-MM-DD)
    const formattedDate = this.formatDate(this.mission.dateDebut);
  
    // Assurez-vous que la durée est un nombre
    const duree = Number(this.mission.duree);
  
    // Créez l'objet missionData avec les types corrects
    const missionData = {
      nom_mission: this.mission.titre,
      description: this.mission.description,
      date_debut: formattedDate, // Doit être une chaîne de caractères
      duree: duree, // Doit être un nombre
    };
  
    // Envoyez les données au backend
    this.missionService.createMission(missionData).subscribe(
      (response) => {
        console.log('Mission créée avec succès :', response);
        this.closeModal(); // Ferme la modale après la création réussie
      },
      (error) => {
        console.error('Erreur lors de la création de la mission :', error);
      }
    );
  }
  
  
  // Méthode pour formater la date au format YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant si nécessaire
    const day = ('0' + date.getDate()).slice(-2); // Ajoute un zéro devant si nécessaire
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