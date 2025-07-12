import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VmService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllVms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vm/by-user`);
  }

  createVm(payload: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/vm/create`, payload, { responseType: 'text' });
  }

  getVmDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vm/details/${name}`);
  }

  deleteVm(vmName: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/vm/delete/${vmName}`, { responseType: 'text' });
  }

  getMyVms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vm/my-vms`);
  }

  // ✅ Utilise l'URL d'environnement ici
  executeRealCommand(payload: {
    ip: string;
    username: string;
    password: string;
    command: string;
  }) {
    return this.http.post(`${this.apiUrl}/vm/execute`, payload, {
      responseType: 'text'
    });
  }
}
