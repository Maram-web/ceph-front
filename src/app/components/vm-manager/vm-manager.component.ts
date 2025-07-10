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
    const payload = {
      vmName: this.vmName,
      osType: this.osType,
      size: this.size,
      storageType: 'RBD' // ou 'FS' selon ton app
    };

    this.vmService.createVm(payload).subscribe({
      next: (res: any) => this.resultMessage = res,
      error: (err: any) => this.resultMessage = '❌ Erreur : ' + err.message
    });
  }
}


   

