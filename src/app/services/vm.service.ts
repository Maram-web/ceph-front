import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VmService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 📥 Récupération des VMs personnelles
  getMyVms(): Observable<any[]> {
    console.log('📥 Récupération des VMs personnelles');
    return this.http.get<any[]>(`${this.apiUrl}/vm/my-vms`);
  }

  // Alias optionnel
  getAllVms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vm/my-vms`);
  }

  // 📤 Création de VM
  createVm(payload: any): Observable<string> {
    console.log('📤 Création de VM avec :', payload);
    return this.http.post(`${this.apiUrl}/vm/create`, payload, { responseType: 'text' });
  }

  // 📄 Récupération des détails d'une VM
  getVmDetails(name: string): Observable<any> {
    console.log(`📥 Récupération des détails de la VM : ${name}`);
    return this.http.get(`${this.apiUrl}/vm/details/${name}`);
  }

  // ▶️ Démarrage d'une VM
  startVm(vmName: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/start/${vmName}`, {}, { responseType: 'text' });
  }

  // 🔐 Retourne les identifiants SSH selon l'IP
  getCredentialsForIp(ip: string): { username: string; password: string } {
    const map: { [key: string]: { username: string; password: string } } = {
      '192.168.13.11': { username: 'ceph1', password: 'maram' },
      '192.168.13.22': { username: 'ceph2', password: 'maram' },
      '192.168.13.33': { username: 'ceph3', password: 'maram' },
      '192.168.13.44': { username: 'ceph4', password: 'maram' },
    };
    return map[ip] || { username: 'springuser', password: 'springpass' }; // fallback à éviter
  }

  // 📡 Exécution d'une commande sur la VM via SSH
  executeRealCommand(payload: {
    ip: string;
    username: string;
    password: string;
    command: string;
  }): Observable<string> {
    return this.http.post(`${this.apiUrl}/vm/execute`, payload, {
      responseType: 'text'
    });
  }

  // 🗑️ Suppression d'une VM
  deleteVm(vmName: string): Observable<string> {
    console.log(`🗑️ Suppression de la VM : ${vmName}`);
    return this.http.delete(`${this.apiUrl}/vm/delete/${vmName}`, { responseType: 'text' });
  }
}
