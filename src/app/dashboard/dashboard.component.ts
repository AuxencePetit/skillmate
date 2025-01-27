import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, RouterOutlet, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;
  loading = false;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo = this.sessionService.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(['auth/login']); // Redirige si non connecté
    }
  }
  goToProfile(): void {
    //this.router.navigate(['profile']);
  }
  logout(): void {
    this.loading = true;
    setTimeout(() => {
      this.sessionService.clearSession();
      this.loading = false;
      this.router.navigate(['auth/login']);
    }, 2000);
    
  }
}

