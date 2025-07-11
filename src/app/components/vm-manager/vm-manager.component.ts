  import { Component } from '@angular/core';
  import { VmService } from '../../services/vm.service';

  @Component({
    selector: 'app-vm-manager',
    templateUrl: './vm-manager.component.html',
    styleUrls: ['./vm-manager.component.scss']
  })
  export class VmManagerComponent {
    vmName: string = '';
    osType: string = 'ubuntu';
    size: string = 'small';
    resultMessage: string = '';

    constructor(private vmService: VmService) {}

    createVm() {
      if (!this.vmName || !this.osType || !this.size) {
        this.resultMessage = '❌ Tous les champs sont obligatoires.';
        return;
      }

      const payload = {
        vmName: this.vmName,
        osType: this.osType,
        size: this.size,
        storageType: 'RBD' // ou 'FS' selon ton besoin
      };

      console.log('📤 Envoi payload VM :', payload);

      this.vmService.createVm(payload).subscribe({
        next: (res: any) => {
          console.log('✅ Réponse serveur :', res);
          this.resultMessage = res;
          this.resetForm();
        },
        error: (err: any) => {
          console.error('❌ Erreur création VM :', err);
          this.resultMessage = '❌ Erreur : ' + (err?.error || err.message || 'Inconnue');
        }
      });
    }

    resetForm() {
      this.vmName = '';
      this.osType = 'ubuntu';
      this.size = 'small';
    }
  }
