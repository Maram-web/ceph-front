import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VmService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Appelle /vm/my-vms
  getMyVms(): Observable<any[]> {
    console.log('📥 Récupération des VMs personnelles');
    return this.http.get<any[]>(`${this.apiUrl}/vm/my-vms`);
  }

  // ✅ Alias optionnel si tu veux l'utiliser ailleurs
getAllVms(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/my-vms`);
}

  createVm(payload: any): Observable<string> {
    console.log('📤 Création de VM avec :', payload);
    return this.http.post(`${this.apiUrl}/vm/create`, payload, { responseType: 'text' });
  }

  getVmDetails(name: string): Observable<any> {
    console.log(`📥 Récupération des détails de la VM : ${name}`);
    return this.http.get(`${this.apiUrl}/vm/details/${name}`);
  }
startVm(vmName: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/start/${vmName}`, {}, { responseType: 'text' });
}



  // ✅ Exécution de commande réelle
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
deleteVm(vmName: string): Observable<string> {
      console.log(`🗑️ Suppression de la VM : ${vmName}`);

  return this.http.delete(`${this.apiUrl}/delete/${vmName}`, { responseType: 'text' });
}



}
