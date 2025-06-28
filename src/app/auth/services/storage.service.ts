import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl = 'http://localhost:8089/api/storage';

  constructor(private http: HttpClient) {}

  // 🔁 Appelle le backend pour obtenir la liste des utilisateurs + stockage
  getUsersStorageInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
}
