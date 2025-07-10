// src/app/components/vm-list/vm-list.component.ts
import { Component, OnInit } from '@angular/core';
import { VmService } from '../../services/vm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.scss']
})
export class VmListComponent implements OnInit {
  vms: any[] = [];
  username: string = 'aya';

  constructor(private vmService: VmService, private router: Router) {}

  ngOnInit(): void {
    this.vmService.getAllVms(this.username).subscribe({
      next: (data) => this.vms = data,
      error: (err) => console.error('❌ Erreur de chargement des VMs', err)
    });
  }

  goToDetails(vmName: string) {
    this.router.navigate(['/vms', vmName]);
  }

  goToCreate() {
    this.router.navigate(['/vms/create']);
  }
  deleteVm(vmName: string) {
  if (confirm(`Supprimer la VM ${vmName} ?`)) {
    this.vmService.deleteVm(vmName).subscribe({
      next: (res) => {
        console.log(res);
        this.vms = this.vms.filter(vm => vm.vmName !== vmName); // retirer de l'affichage
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
}

}
