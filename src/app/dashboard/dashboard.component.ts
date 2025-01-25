import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo = this.sessionService.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(['/login']); // Redirige si non connecté
    }
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}

