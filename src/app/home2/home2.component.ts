import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {
  currentUser: any = null;

  // Données fictives de quota
  usedCpu: number = 20;
  maxCpu: number = 100;
  usedRam: number = 30;
  maxRam: number = 100;
  usedDisk: number = 10;
  maxDisk: number = 100;

  cpuUsage: number = 0;
  ramUsage: number = 0;
  diskUsage: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Charger utilisateur connecté
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.currentUser = null;
      }
    });

    // Calculer l’utilisation en %
    this.cpuUsage = (this.usedCpu / this.maxCpu) * 100;
    this.ramUsage = (this.usedRam / this.maxRam) * 100;
    this.diskUsage = (this.usedDisk / this.maxDisk) * 100;
  }
}
