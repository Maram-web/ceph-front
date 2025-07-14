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
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private vmService: VmService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) {
      console.error('⚠️ Aucun nom de VM fourni dans l’URL.');
      this.errorMessage = 'Aucun nom de VM fourni.';
      return;
    }

    console.log(`📡 Chargement des détails pour la VM '${name}'`);
    this.vmService.getVmDetails(name).subscribe({
      next: (data) => {
        this.vm = data;
        console.log('✅ Détails de la VM chargés avec succès :', data);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des détails de la VM :', err);
        const msg = typeof err.error === 'string' ? err.error : 'Erreur de chargement inconnue.';
        this.errorMessage = msg;
      }
    });
  }

  executeCommand(): void {
    if (!this.command.trim()) {
      console.warn('⚠️ Commande vide ignorée.');
      return;
    }

    if (!this.vm || !this.vm.ip) {
      console.error('❌ Impossible d’exécuter la commande : VM ou IP manquante.');
      this.output.push('❌ Impossible d’exécuter la commande : VM ou IP manquante.');
      return;
    }

    const payload = {
      ip: this.vm.ip,
      username: 'springuser', // 📝 À adapter dynamiquement si besoin
      password: 'springpass',
      command: this.command
    };

    this.output.push(`$ ${this.command}`);
    console.log('🚀 Envoi de la commande SSH :', payload);

    this.vmService.executeRealCommand(payload).subscribe({
      next: (result: string) => {
        console.log('✅ Réponse de la commande SSH :', result);
        this.output.push(result);
        this.command = '';
      },
      error: (err) => {
        console.error('❌ Erreur SSH :', err);
        const msg = typeof err.error === 'string' ? err.error : '❌ Erreur inconnue lors de l’exécution.';
        this.output.push(msg);
        this.command = '';
      }
    });
  }
}
