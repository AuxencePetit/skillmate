import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, RouterOutlet, IconFieldModule, InputIconModule, InputTextModule, ConfirmDialogModule, ToastModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DashboardComponent implements OnInit {
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string } | null = null;

  constructor(private sessionService: SessionService, private router: Router,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.userInfo = this.sessionService.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(['auth/login']); // Redirige si non connecté
    }
  }
  goToProfile(): void {
    this.router.navigate(['dashboard/profile', this.userInfo?.idUtilisateur]);
  }
  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['auth/login']);
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Vous voulez vraiment vous déconnecter?',
        header: 'Confirmer la déconnexion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.logout()
    });
  }
  
  goToPersonnels(): void {
    this.router.navigate(['dashboard/personnels']);
  }
}

