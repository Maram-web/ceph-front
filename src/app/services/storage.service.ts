import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private baseUrl = 'http://localhost:8080/api/storage';

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers,
      reportProgress: true,
      observe: 'events'
    });
  }
}
