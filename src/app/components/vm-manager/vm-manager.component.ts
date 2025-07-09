import { Component } from '@angular/core';
import { VmService } from '../../services/vm.service';

@Component({
  selector: 'app-vm-manager',
  templateUrl: './vm-manager.component.html',
  styleUrls: ['./vm-manager.component.scss']
})
export class VmManagerComponent {
  username: string = 'aya'; // à adapter + tard avec auth
  vmName: string = '';
  osType: string = 'ubuntu';
  size: string = 'small';
  resultMessage: string = '';

  constructor(private vmService: VmService) {}

  createVm() {
    const payload = {
      username: this.username,
      name: this.vmName,
      osType: this.osType,
      size: this.size
    };

    this.vmService.createVm(payload).subscribe({
      next: (res: any) => this.resultMessage = res.message || '✅ VM créée avec succès',
      error: (err: any) => this.resultMessage = '❌ Erreur : ' + err.message
    });
  }
}
