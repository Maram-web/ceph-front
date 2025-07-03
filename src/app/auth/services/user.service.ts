import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://192.168.13.11:30080/api/auth'; // ✅ adapte le port si besoin

  constructor(private http: HttpClient) {}

/*<  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }>*/
  register(data: any): Observable<any> {
  return this.http.post('http://192.168.13.11:30080/api/auth/register', data);
}


login(loginPayload: { email: string; password: string }): Observable<string> {
  return this.http.post(`${this.baseUrl}/login`, loginPayload, {
    responseType: 'text'
  });
}


getCurrentUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get(`${this.baseUrl}/me`, { headers });
}



}
