import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VmService {
  constructor(private http: HttpClient) {}

  getAllVms(): Observable<any[]> {
    console.log('📥 Requête pour récupérer toutes les VMs de l’utilisateur');
    return this.http.get<any[]>('/api/vm/by-user');
  }

  createVm(payload: any): Observable<string> {
    console.log('📤 Création de VM avec :', payload);
    return this.http.post('/api/vm/create', payload, { responseType: 'text' });
  }

  getVmDetails(name: string): Observable<any> {
    console.log(`📥 Récupération des détails de la VM : ${name}`);
    return this.http.get(`/api/vm/details/${name}`);
  }

  deleteVm(vmName: string): Observable<string> {
    console.log(`🗑️ Suppression de la VM : ${vmName}`);
    return this.http.delete(`/api/vm/delete/${vmName}`, { responseType: 'text' });
  }

  getMyVms(): Observable<any[]> {
    console.log('📥 Récupération des VMs personnelles');
    return this.http.get<any[]>('/api/vm/my-vms');
  }
}
