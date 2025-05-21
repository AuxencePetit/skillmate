import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAdminViewComponent } from '../mission-admin-view/mission-admin-view.component';
import { MissionChefProjetViewComponent } from '../mission-chef-projet-view/mission-chef-projet-view.component';
import { MissionEmployeViewComponent } from '../mission-employe-view/mission-employe-view.component';
import { SessionService } from '../services/session.service';
import { MissionOverviewComponent } from "../mission-overview/mission-overview.component";
import { Mission } from '../models/mission.model';
import { MissionService } from '../services/mission.service';
import { MissionUserService } from '../services/mission-user.service';

@Component({
  selector: 'app-mission',
  imports: [CommonModule, MissionAdminViewComponent, MissionChefProjetViewComponent, MissionEmployeViewComponent, MissionOverviewComponent],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {
  userInfo!: { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: Date; date_naissance: Date } | null;
  mission: Mission | null = null;
  userID: number =0;

  constructor(
    private sessionService: SessionService,
     private missionUserService: MissionUserService ) { }

  ngOnInit(): void {
    this.userInfo = this.sessionService.getUserInfo();
        console.log('User info :', this.userInfo);
        this.missionUserService.getMissionUser(this.userInfo!.idUtilisateur).subscribe((missions: Mission[]) => {
              this.mission = missions[0];
              console.log('Mission reçue :', this.mission);
      });
  }
}
