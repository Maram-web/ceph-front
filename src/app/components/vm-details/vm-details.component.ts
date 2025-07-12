// src/app/components/vm-details/vm-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmService } from '../../services/vm.service';

@Component({
  selector: 'app-vm-details',
  templateUrl: './vm-details.component.html',
  styleUrls: ['./vm-details.component.scss']
})
export class VmDetailsComponent implements OnInit {
  vm: any;
  command: string = '';
  output: string[] = [];

  constructor(private route: ActivatedRoute, private vmService: VmService) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.vmService.getVmDetails(name!).subscribe({
      next: (data) => this.vm = data,
      error: (err) => console.error('❌ Erreur chargement VM', err)
    });
  }

  executeCommand() {
    if (!this.command.trim()) return;

    const payload = {
      ip: this.vm.ip,
      username: 'springuser', // à adapter si tu récupères dynamiquement
      password: 'springpass',
      command: this.command
    };

    this.output.push(`$ ${this.command}`);

    this.vmService.executeRealCommand(payload).subscribe({
      next: (result) => {
        this.output.push(result);
        this.command = '';
      },
      error: (err) => {
        const message = err.error || '❌ Erreur inconnue.';
        this.output.push(message);
        this.command = '';
      }
    });
  }
}
