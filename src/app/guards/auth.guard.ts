import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service'; // Service de gestion de session

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      // Si l'utilisateur est connecté, autorisez l'accès
      return true;
    } else {
      // Sinon, redirigez vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
