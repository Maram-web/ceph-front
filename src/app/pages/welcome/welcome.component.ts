import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  selectedIndex = 0;

  carouselImages = [
    'assets/images/hero3.jpg',
    'assets/images/hero1.jpg',
    'assets/images/hero2.jpg',
   
  ];

  products = [
    {
      title: 'Virtual Machines',
      description: 'Lancez vos VM en un clic et gérez-les simplement.',
      icon: 'desktop_windows',
      route: '/vms'
    },
    {
      title: 'Buckets',
      description: 'Stockage objet distribué haute performance.',
      icon: 'cloud',
      route: '/bucket'
    },
    {
      title: 'CephFS',
      description: 'Stockage en mode fichier évolutif et sécurisé.',
      icon: 'folder_shared',
      route: '/cephfs'
    },
    {
      title: 'Monitoring',
      description: 'Surveillez votre cloud avec des dashboards puissants.',
      icon: 'monitor',
      route: '/monitoring'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.carouselImages.length;
    }, 5000);
  }

  goToLogin(targetRoute: string = '/dashboard'): void {
    window.location.href = `/login?redirect=${encodeURIComponent(targetRoute)}`;
  }

  navigateToProduct(product: any) {
    if (product.route) {
      this.router.navigate([product.route]);
    }
  }
}
