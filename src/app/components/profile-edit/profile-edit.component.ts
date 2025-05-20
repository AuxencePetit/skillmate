import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { AuthService } from '../../services/auth.service';
import { CompetenceService } from '../../services/competence.service';
// PrimeNG
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ChipModule } from 'primeng/chip'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule,
    CardModule,
    MessagesModule,
    ChipModule,
    ToastModule,
    MessageModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  userData: { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: string; date_naissance: string } | null = null;
  Competences: any[] = [];
  age: number | null = null;
  ancienete: number | null = null;
  statut_employee: string | null = null;
  userId!: number;
  profileForm!: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService, private competenceService: CompetenceService,private fb: FormBuilder,private messageService: MessageService,private personeService: PersonnelService, private router: Router) {}

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
    this.profileForm = this.fb.group({
      prenom: [this.userData?.prenom || '', Validators.required],
      nom: [this.userData?.nom || '', Validators.required],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      date_naissance: [this.userData?.date_naissance ? new Date(this.userData.date_naissance) : null],
      date_embauche: [this.userData?.date_embauche ? new Date(this.userData.date_embauche) : null, Validators.required]
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
        this.profileForm.patchValue({
          prenom: user.prenom,
          nom: user.nom,
          email: user.email,
          date_naissance: user.date_naissance ? new Date(user.date_naissance) : null,
          date_embauche: user.date_embauche ? new Date(user.date_embauche) : null
        });
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du profil :", err);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }
    else {  
      const formData = {
        ...this.profileForm.value,
        idUtilisateur: this.userId,
        statut_employee: this.userData?.statut_personnel
      };
      
      console.log("Données du formulaire :", formData);
      this.personeService.updatePersonnel(this.userId, formData).subscribe({
        next: (response) => {
          console.log("Profil mis à jour avec succès :", response);
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profil mis à jour avec succès.' });
          this.router.navigate(['dashboard/profile', this.userId]);
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour du profil :", err);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du profil.' });
        }
      });
    }

  }
}
