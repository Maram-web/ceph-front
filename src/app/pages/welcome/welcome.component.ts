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
  goToRegister(plan: any): void {
  if (plan.disabled) {
    this.router.navigate(['/authentication/login'])
  }
}


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
      route: '/spaces'
    },
    {
      title: 'Forum',
      description: 'change your questions intraengenneer',
      icon: 'chat',
      route: '/forum'
    },
   /*
      title: 'Monitoring',
      description: 'Surveillez votre cloud avec des dashboards puissants.',
      icon: 'monitor',
      route: '/monitoring'
    }*/
  ];
  plans = [
{
  title: 'Free',
  image: 'assets/images/free-plan.jpg',
  description: 'Start for free, no credit card required',
  features: [
    '1 Small VM (1 vCPU / 1GB RAM)',
    '5GB S3 Storage',
    'Forum access (read-only)',
    'No command access'
  ],
  price: 0,
  btnColor: 'primary',
  button: 'Let’s Start',
  disabled: false // plus besoin de true ici
}

,
  {
    title: 'Pro',
    image: 'assets/images/pro-plan.jpg',
    description: 'Perfect for active developers',
    features: [
      'Up to 3 Medium VMs',
      '50GB S3 Storage',
      'Forum: Ask & Answer',
      'Launch / Stop / Create VMs'
    ],
    price: 25,
    btnColor: 'accent',
    button: 'Subscribe',
    disabled: false
  },
  {
    title: 'Enterprise',
    image: 'assets/images/enterprise-plan.jpg',
    description: 'For teams and high-demand projects',
    features: [
      'Up to 10 Large VMs',
      '200GB S3 + Snapshots',
      'Automation API',
      'Priority Support'
    ],
    price: 90,
    btnColor: 'warn',
    button: 'Contact Us',
    disabled: false
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
   scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
