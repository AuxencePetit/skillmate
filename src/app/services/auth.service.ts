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

  register(user: {
    prenom: string;
    nom: string;
    email: string;
    password: string;
    date_naissance: string;
  }): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/auth/register`, user).subscribe({
        next: (response: any) => {
          console.log('Réponse API:', response); // 🔍 Ajoute un log pour vérifier la réponse
          if (response.user) { // ✅ Vérifie la présence de `user`
            this.sessionService.saveSession(response.user);
            observer.next(response);
          } else {
            observer.error('Échec de l\'inscription.');
          }
        },
        error: (err: any) => observer.error(err),
      });
    });
  }

  // Déconnexion
  logout(): void {
    this.sessionService.clearSession();
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/personnel/${id}`);
  }

}
