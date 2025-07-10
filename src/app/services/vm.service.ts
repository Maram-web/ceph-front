import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VmService {
  constructor(private http: HttpClient) {}

  getAllVms(username: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/vm/by-user/${username}`);
  }

  createVm(payload: any): Observable<string> {
    return this.http.post('/api/vm/create', payload, { responseType: 'text' });
  }

  getVmDetails(name: string): Observable<any> {
    return this.http.get(`/api/vm/details/${name}`);
  }

  deleteVm(vmName: string): Observable<string> {
    return this.http.delete(`/api/vm/delete/${vmName}`, { responseType: 'text' });
  }
}
