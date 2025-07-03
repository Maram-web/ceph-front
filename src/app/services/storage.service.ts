import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private baseUrl = 'http://192.168.13.11:30080/api/storage';

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
  getUsersStorageInfo(): Observable<any[]> {
  return this.http.get<any[]>('http://192.168.13.11:30080/api/storage/users');
}

}
