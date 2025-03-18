import { Component } from '@angular/core';
import { Mission } from '../models/mission.model';
import { MissionService } from '../services/mission.service';
import { ButtonModule } from 'primeng/button';
import { CreateMissionComponent } from '../create-mission/create-mission.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MissionModalComponent } from "../core/modale/mission-modal/mission-modal.component"; // Importer FormsModule

@Component({
  selector: 'app-mission-admin-view',
  imports: [ButtonModule, TableModule, TagModule, SelectModule, FormsModule, MissionModalComponent],
  templateUrl: './mission-admin-view.component.html',
  styleUrls: ['./mission-admin-view.component.scss']
})export class MissionAdminViewComponent {
  missions?: Mission[];
  statuses: string[] = ['En préparation', 'Planifiée', 'En cours', 'Terminé'];
  selectedStatus: string | null = null;
  isModalVisible: boolean = false;

  constructor(private missionService: MissionService) {
    this.missionService.getMissions().subscribe((missions: Mission[]) => {
      this.missions = missions;
    });
  }

  openModal() {
    this.isModalVisible = true; // Définit la variable pour afficher la modal
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
    switch (status) {
      case 'En préparation':
        return 'info';
      case 'Planifiée':
        return 'success';
      case 'En cours':
        return 'warn';
      case 'Terminé':
        return 'danger';
      default:
        return 'info';
    }
  }

  // Fonction de filtrage avec un champ typé
  filter(value: string, field: keyof Mission) {  
    if (value) {
      this.missions = this.missions!.filter(mission => mission[field] === value);
    } else {
      this.missionService.getMissions().subscribe((missions: Mission[]) => {
        this.missions = missions;
      });
    }
  }
}

