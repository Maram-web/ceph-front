import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  carouselImages = [
    'assets/images/hero1.jpg',
    'assets/images/hero2.jpg',
    'assets/images/hero3.jpg'
  ];

  products = [
    { icon: 'cloud', title: 'Virtual Machines', description: 'Manage your training VMs on demand.' },
    { icon: 'storage', title: 'CephFS Storage', description: 'Mount and consume scalable CephFS volumes.' },
    { icon: 'dns', title: 'Kubernetes Orchestration', description: 'Deploy & scale containers easily.' }
  ];

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
