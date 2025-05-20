import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NecessiterMissionComp } from '../models/mission.model';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private apiUrl = 'http://localhost:3000/competences'; // Ajuste selon ton API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les compétences
  getCompetences(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Récupérer une compétence par ID
  getCompetenceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getCompetencesByUserId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/personnel/${id}`);
  }

  getCompetencesByCategorieId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorie/${id}`);
  }

  // Récupérer les compétences nécessaires pour une mission
  getCompetencesByMissionId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mission/${id}`);
  }

  // Ajouter une nouvelle compétence
  addCompetence(competence: any): Observable<any> {
    return this.http.post(this.apiUrl, competence);
  }

  // Mettre à jour une compétence
  updateCompetence(id: number, competence: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, competence);
  }

  // Supprimer une compétence
  deleteCompetence(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ajouter une compétence à une mission
  addCompetenceToMission(idMission: number, idCompetence: number, nombre_personne: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/mission/${idMission}`, {
      idCompetence,
      nombre_personne
    });
  }
  // supprimer une compétence d'une mission
  deleteCompetenceFromMission(idMission: number, idCompetence: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/mission/${idMission}/competence/${idCompetence}`);
  }
}
