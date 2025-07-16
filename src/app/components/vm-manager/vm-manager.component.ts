import { Component } from '@angular/core';
import { VmService } from '../../services/vm.service';
import { Router } from '@angular/router';

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
  isCreating = false;

  constructor(
    private vmService: VmService,
    private router: Router // ✅ CORRECTION : ajout du Router ici
  ) {}

  createVm() {
    if (!this.vmName || !this.osType || !this.size) {
      this.resultMessage = '❌ Tous les champs sont obligatoires.';
      return;
    }

    this.isCreating = true;
    this.resultMessage = '⏳ En cours de création...';

    const payload = {
      vmName: this.vmName,
      osType: this.osType,
      size: this.size,
      storageType: 'RBD'
    };

    console.log('📤 Envoi payload VM :', payload);

    this.vmService.createVm(payload).subscribe({
      next: (res: any) => {
        console.log('✅ Réponse serveur :', res);
        this.resultMessage = '✅ VM créée avec succès !';

        setTimeout(() => {
          this.router.navigate(['/vms']); // ← adapte "res?.id" selon ta réponse API
        }, 1500);

        this.isCreating = false;
        this.resetForm();
      },
      error: (err: any) => {
        console.error('❌ Erreur création VM :', err);
        this.resultMessage = '❌ Erreur : ' + (err?.error || err.message || 'Inconnue');
        this.isCreating = false;
      }
    });
  }

  resetForm() {
    this.vmName = '';
    this.osType = 'ubuntu';
    this.size = 'small';
  }
}
