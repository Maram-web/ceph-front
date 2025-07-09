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
}
