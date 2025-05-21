import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/mission.model';
import { PersonnelService } from './personnel.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(
    private http: HttpClient,
    private personnelService: PersonnelService
  ) {}

  private apiUrl = 'http://localhost:3000/missions'; // Ajuste selon ton API

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  createMission(mission: { nom_mission: string; description: string; date_debut: string; duree: number }, idChefProj: number): Observable<any> {
    console.log('Mission:', mission);
    return this.http.post<{ id: { insertId: number } }>(this.apiUrl, mission).pipe(
      switchMap((response) => {
        if (!response || !response.id || !response.id.insertId) {
          throw new Error('Invalid response from API');
        }
        const idMission = response.id.insertId;
        return this.addPersonnelToMission(idMission, idChefProj, 'chef_projet').pipe(
          map(() => idMission)
        );
      })
    );
  }

  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(
      `${this.apiUrl}/${mission.idMission}`,
      mission
    );
  }

// mission-user.service.ts ou mission.service.ts
updateMissionStatus(idMission: number, statut: string) {
  return this.http.patch(`${this.apiUrl}/${idMission}/statut`, { statut_mission: statut });
}

  deleteMission(id: number): Observable<Mission> {
    return this.http.delete<Mission>(`${this.apiUrl}/${id}`);
  }

  addPersonnelToMission(idMission: number, idUtilisateur: number, role: string): Observable<any> {
    return this.personnelService.updatePersonnelRole(idUtilisateur, role).pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrl}/affecter`, { idUtilisateur, idMission, date: new Date() })
      )
    );
  }
}
