import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/mission.model';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from './personnel.service';
import { Observable } from 'rxjs';
import { MissionService } from './mission.service';

@Injectable({
  providedIn: 'root'
})
export class MissionUserService {

  constructor(private http: HttpClient, private personnelService: PersonnelService,private missionService: MissionService) { }

  private apiUrl = 'http://localhost:3000/missionUser'; // Ajuste selon ton API

 getMissionUser(id: number): Observable<Mission[]> {
  return this.http.get<Mission[]>(`${this.apiUrl}/user/${id}`);
}

  getPersonnelByMission(id: number): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.apiUrl}/mission/${id}`);
  }

  addPersonnelToMission(idPersonel : number, idMission: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { idPersonel, idMission });
  }
}
