import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/mission.model';
import { PersonnelService } from './personnel.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {


  constructor(private http: HttpClient, private personnelService: PersonnelService) { }

  private apiUrl = 'http://localhost:3000/missions'; // Ajuste selon ton API


  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

   createMission(mission: {
    nom_mission: string;
    description: string;
    date_debut: string;
    duree: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, mission);
  }

  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${mission.idMission}`, mission);
  }

  deleteMission(id: number): Observable<Mission> {
    return this.http.delete<Mission>(`${this.apiUrl}/${id}`);
  }

  addPersonnelToMission(idMission: number, idUtilisateur: number,role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idMission}/affecter`, {idUtilisateur, idMission, date: new Date()});
    this.personnelService.updatePersonnelRole(idUtilisateur, role);
  }
}
