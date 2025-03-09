import { Component } from '@angular/core';
import { Mission } from '../models/mission.model';
import { MissionService } from '../services/mission.service';
import { ButtonModule } from 'primeng/button';
import { CreateMissionComponent } from '../create-mission/create-mission.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms'; // Importer FormsModule

@Component({
  selector: 'app-mission-admin-view',
  imports: [ButtonModule, CreateMissionComponent, TableModule, TagModule, SelectModule, FormsModule], // Ajouter DropdownModule et FormsModule aux imports
  templateUrl: './mission-admin-view.component.html',
  styleUrl: './mission-admin-view.component.scss'
})
export class MissionAdminViewComponent {
  missions?: Mission[];
  statuses: string[] = ['En préparation', 'Planifiée', 'En cours', 'Terminé'];
  selectedStatus: string | null = null;

  constructor(private missionService: MissionService) {
    this.missionService.getMissions().subscribe((missions: Mission[]) => {
      this.missions = missions;
    });
  }
  toggleCreateMission(){
    let container = document.getElementById('create-mission-from');
    if(container?.style.display === 'none'){
      container.style.display = 'block';
    } else {
      container!.style.display = 'none';
    }

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
  filter(value: string, field: keyof Mission) {  // 'field' doit être une clé de Mission
    if (value) {
      this.missions = this.missions!.filter(mission => mission[field] === value);
    } else {
      this.missionService.getMissions().subscribe((missions: Mission[]) => {
        this.missions = missions;
      });
    }
  }
}
