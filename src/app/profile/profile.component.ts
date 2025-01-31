import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CompetenceService } from '../services/competence.service';

//IMPORTS PRIMENG
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';



@Component({
  selector: 'app-profile',
  standalone: true, // ✅ Assure-toi que c'est bien standalone
  imports: [
    CommonModule,
    HttpClientModule, // ✅ Ajoute HttpClientModule ici
    ButtonModule,
    RouterOutlet,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ChipModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userData: { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: string; date_naissance: string } | null = null;
  Competences: any[] = [];
  age: number | null = null;
  ancienete: number | null = null;
  statut_employee: string | null = null;
  userId!: number;


  constructor(private route: ActivatedRoute, private authService: AuthService, private competenceService: CompetenceService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      if (this.userId) {
        this.getUserProfile();
        this.competenceService.getCompetencesByUserId(this.userId).subscribe({
          next: (competences) => {
            this.Competences = competences;
          },
          error: (err) => {
            console.error("Erreur lors de la récupération des compétences :", err);
          }
        });
      }
    });
  }

  getUserProfile() {
    this.authService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (!user) {
          console.error("Utilisateur non trouvé.");
          return;
        }
        this.userData = user;
        
        // ✅ Calcul de l'âge et de l'ancienneté une fois les données récupérées
        const naissance = new Date(user.date_naissance);
        const embauche = new Date(user.date_embauche);
        const currentYear = new Date().getFullYear();

        this.age = currentYear - naissance.getFullYear();
        this.ancienete = currentYear - embauche.getFullYear();

        // ✅ Déterminer le statut en français
        switch(user.statut_personnel) {
          case 'employe':
            this.statut_employee = 'Employé';
            break;
          case 'chef_projet':
            this.statut_employee = 'Chef de mission';
            break;
          case 'admin':
            this.statut_employee = 'Administrateur';
            break;
          default:
            this.statut_employee = 'Inconnu';
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du profil :", err);
      }
    });
  }

  editProfile(): void {
    console.log('Edit profile');
  }
}
