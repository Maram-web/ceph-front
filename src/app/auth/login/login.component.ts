import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignDivVisible: boolean = false;

  loginForm!: FormGroup;

  signUpObj = {
    username: '',
    email: '',
    password: ''
  };

  email_validation_msg = '';
  password_validation_msg = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getCurrentUser().subscribe({
        next: (user) => {
          console.log('✅ Utilisateur connecté détecté:', user);
          this.router.navigateByUrl('/');
          // ou rediriger vers un dashboard
        },
        error: () => {
          console.warn('⚠️ Token invalide ou expiré');
          localStorage.removeItem('token');
        }
      });
    }
  }

  togglePanel(): void {
    this.isSignDivVisible = !this.isSignDivVisible;
  }

  onRegister(): void {
    console.log('📦 Données envoyées au backend :', this.signUpObj);

    this.userService.register(this.signUpObj).subscribe({
      next: () => {
        alert('Inscription réussie ! Vous êtes connecté.');

        const loginPayload = {
          identifier: this.signUpObj.email,
          password: this.signUpObj.password
        };

        this.userService.login(loginPayload).subscribe({
          next: (token: string) => {
            localStorage.setItem('token', token);
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (err) => {
        if (err.status === 409) {
          alert("Nom d'utilisateur ou email déjà utilisé.");
        } else {
          alert('Erreur lors de l’inscription.');
        }
      }
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.email_validation_msg = this.loginForm.get('email')?.invalid ? 'Email invalide' : '';
      this.password_validation_msg = this.loginForm.get('password')?.invalid ? 'Mot de passe requis' : '';
      return;
    }

    const loginPayload = {
      identifier: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('🔐 Payload envoyé :', loginPayload);

    this.userService.login(loginPayload).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);

        const redirectPath = this.route.snapshot.queryParamMap.get('redirect') || '/dashboard';
        console.log('🔁 Redirection vers :', redirectPath);

        this.router.navigateByUrl(redirectPath);
      },
      error: (err) => {
        console.error('❌ Erreur lors du login :', err);
        alert('Connexion échouée. Vérifiez vos identifiants.');
      }
    });
  }
}
