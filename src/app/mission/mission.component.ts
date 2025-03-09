import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAdminViewComponent } from '../mission-admin-view/mission-admin-view.component';
import { MissionChefProjetViewComponent } from '../mission-chef-projet-view/mission-chef-projet-view.component';
import { MissionEmployeViewComponent } from '../mission-employe-view/mission-employe-view.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-mission',
  imports: [CommonModule, MissionAdminViewComponent, MissionChefProjetViewComponent, MissionEmployeViewComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {
  userInfo!: { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: Date; date_naissance: Date } | null;
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.userInfo = this.sessionService.getUserInfo();
  }
}
