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
    this.loadMyVMs(); // ✅ Appelle la bonne méthode
  }

  // ✅ Méthode de rechargement des VMs après suppression
  loadMyVMs(): void {
    this.vmService.getAllVms().subscribe({
      next: (data) => {
        this.vms = data;
      },
      error: (err) => {
        console.error('❌ Erreur de chargement des VMs', err);
      }
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
          alert(res);
          this.loadMyVMs(); // 🔁 recharge après suppression
        },
        error: (err) => {
          console.error(err);
          alert("❌ Erreur lors de la suppression !");
        }
      });
    }
  }



  startVm(vmName: string) {
  this.vmService.startVm(vmName).subscribe({
    next: (res) => {
      alert(res);
      this.loadMyVMs(); // recharge après démarrage
    },
    error: (err) => {
      console.error(err);
      alert("❌ Erreur lors du démarrage !");
    }
  });
}
displayedColumns: string[] = ['vmName', 'size', 'storageType', 'createdAt', 'status', 'action'];


}
