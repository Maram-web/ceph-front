import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from './auth/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flexy-angular';
  currentUser: any = null;
  isAuthPage: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // 🔐 Récupère l'utilisateur courant
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.currentUser = user,
      error: () => this.currentUser = null
    });

this.router.events.pipe(
  filter(event => event instanceof NavigationEnd)
).subscribe((event) => {
  const nav = event as NavigationEnd;
  const url = nav.urlAfterRedirects;

  this.isAuthPage =
    url.includes('/authentication/login') ||
    url.includes('/authentication/register') ||
    url === '/home' ||
    url === '/home2' ||
    url === '/vms'
    || url == '/spaces' || url == '/forum'||url == '/ create-vm'


   
});

  }

  goToLogin(targetRoute: string = '/dashboard') {
    this.router.navigate(['/authentication/login'], {
      queryParams: { redirect: targetRoute }
    });
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['/authentication/login']);
  }

    scrollToFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  
}
}