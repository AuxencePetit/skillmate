import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de votre backend

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  // Méthode pour se connecter
  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/auth/login`, credentials).subscribe({
        next: (response: any) => {
          if (response.success) {
            // Sauvegarde de la session utilisateur
            this.sessionService.saveSession(response.user);
            observer.next(response);
          } else {
            observer.error('Échec de la connexion.');
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }

  // Déconnexion
  logout(): void {
    this.sessionService.clearSession();
  }
}
