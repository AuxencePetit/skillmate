import { Injectable } from '@angular/core';
import { Personnel } from '../models/personnel.model';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // Sauvegarde des informations utilisateur
  saveSession(user: { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: string; date_naissance: string }): void {
    console.log(user);
    localStorage.setItem('idUtilisateur', user.idUtilisateur.toString());
    localStorage.setItem('nom', user.nom);
    localStorage.setItem('prenom', user.prenom);
    localStorage.setItem('email', user.email);
    localStorage.setItem('statut_personnel', user.statut_personnel);
    localStorage.setItem('date_embauche', user.date_embauche);
    localStorage.setItem('date_naissance', user.date_naissance);
    console.log(localStorage);
  }

  // Récupération de l'ID utilisateur
  getUserId(): number | null {
    const id = localStorage.getItem('idUtilisateur');
    return id ? parseInt(id, 10) : null;
  }

  // Récupération des informations utilisateur
  getUserInfo(): { idUtilisateur: number; nom: string; prenom: string; email: string; statut_personnel: string; date_embauche: Date; date_naissance: Date } | null {
    const id = this.getUserId();
    if (!id) return null;
    return {
      idUtilisateur: id,
      nom: localStorage.getItem('nom') || '',
      prenom: localStorage.getItem('prenom') || '',
      email: localStorage.getItem('email') || '',
      statut_personnel: localStorage.getItem('statut_personnel') || '',
      date_embauche: new Date(localStorage.getItem('date_embauche') || ''),
      date_naissance: new Date(localStorage.getItem('date_naissance') || ''),
    };
  }

  // Effacer la session
  clearSession(): void {
    localStorage.removeItem('idUtilisateur');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('email');
    localStorage.removeItem('statut_personnel');
    localStorage.removeItem('date_embauche');
    localStorage.removeItem('date_naissance');
    localStorage.removeItem('dateEmbauche');
    localStorage.removeItem('dateNaissance');
    localStorage.removeItem('statut');
    localStorage.removeItem('statut_personnel_personnel');
  }

  // Vérification si un utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }
}
