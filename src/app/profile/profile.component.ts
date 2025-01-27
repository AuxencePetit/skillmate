import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ButtonModule, RouterOutlet, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userInfo: { idUtilisateur: number; nom: string; prenom: string; email: string; statut: string; date_embauche: Date; date_naissance: Date } | null = null;
  age: number | null = null;
  ancienete: number | null = null;

  constructor(private sessionService: SessionService) {
    this.userInfo = this.sessionService.getUserInfo();
    this.age = new Date().getFullYear() - this.userInfo!.date_naissance.getFullYear();
    this.ancienete = new Date().getFullYear() - this.userInfo!.date_embauche.getFullYear();
  }
  editProfile(): void {
    console.log('Edit profile');
  }
}
