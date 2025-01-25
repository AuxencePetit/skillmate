import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // Sauvegarde des informations utilisateur
  saveSession(user: { idUtilisateur: number; nom: string; prenom: string; email: string }): void {
    localStorage.setItem('idUtilisateur', user.idUtilisateur.toString());
    localStorage.setItem('nom', user.nom);
    localStorage.setItem('prenom', user.prenom);
    localStorage.setItem('email', user.email);
  }

  // Récupération de l'ID utilisateur
  getUserId(): number | null {
    const id = localStorage.getItem('idUtilisateur');
    return id ? parseInt(id, 10) : null;
  }

  // Récupération des informations utilisateur
  getUserInfo(): { idUtilisateur: number; nom: string; prenom: string; email: string } | null {
    const id = this.getUserId();
    if (!id) return null;
    return {
      idUtilisateur: id,
      nom: localStorage.getItem('nom') || '',
      prenom: localStorage.getItem('prenom') || '',
      email: localStorage.getItem('email') || '',
    };
  }

  // Effacer la session
  clearSession(): void {
    localStorage.removeItem('idUtilisateur');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('email');
  }

  // Vérification si un utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getUserId() !== null;
  }
}
