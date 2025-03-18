import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/personnel'; // Ajuste selon ton API

  getPersonnels() {
    return this.http.get(`${this.apiUrl}`);
  }

  getPersonnelById(id: number) {
    return this.http.get(`${this.apiUrl}/unique/${id}`);
  }

  addPersonnel(personnel: any) {
    return this.http.post(this.apiUrl, personnel);
  }

  updatePersonnel(id: number, personnel: any) {
    return this.http.put(`${this.apiUrl}/${id}`, personnel);
  }

  updatePersonnelRole(id: number, role: string) {
    return this.http.put(`${this.apiUrl}/${id}/role`, {role
    });
  }

  deletePersonnel(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  recupererEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }
}
