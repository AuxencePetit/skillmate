import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/categories'; // Ajuste selon ton API

  constructor(private http: HttpClient) {}
  
  // Récupérer toutes les catégories
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Récupérer une catégorie par ID
  getCategorieById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
