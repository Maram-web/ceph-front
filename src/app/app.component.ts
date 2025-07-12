import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flexy-angular';

  constructor(private router: Router) {}

ngOnInit(): void {
  const user = localStorage.getItem('user');
  const currentUrl = this.router.url;

  if (!user && !currentUrl.startsWith('/authentication')) {
    this.router.navigate(['/authentication/login']);
  }
}

}
