import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, {
      withCredentials: true // ✅ Si le backend utilise les cookies ou JWT avec credentials
    });
  }

  login(loginPayload: { email: string; password: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, loginPayload, {
      responseType: 'text',
      withCredentials: true // ✅ Obligatoire si le token est mis dans un cookie HTTPOnly
    });
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers: any = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.http.get(`${this.baseUrl}/me`, {
      headers,
      withCredentials: true // ✅ encore ici pour cohérence et compatibilité
    });
  }
}
