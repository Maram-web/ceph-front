import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VmService {
  constructor() {}

  getAllVms(username: string): Observable<any[]> {
    // 🎭 MOCK: liste de VMs factices
    return of([
      {
        name: 'vm-ubuntu-test',
        osType: 'ubuntu',
        size: 'medium',
        createdAt: new Date()
      },
      {
        name: 'vm-win-dev',
        osType: 'windows',
        size: 'large',
        createdAt: new Date()
      }
    ]);
  }

  createVm(payload: any): Observable<string> {
    console.log('MOCK createVm called with:', payload);
    return of('✅ VM mock créée avec succès');
  }

  getVmDetails(name: string): Observable<any> {
    return of({
      name: name,
      osType: 'ubuntu',
      size: 'medium',
      createdAt: new Date(),
      status: 'running'
    });
  }
}
