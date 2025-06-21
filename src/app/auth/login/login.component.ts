import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignDivVisible: boolean = false;

  loginForm!: FormGroup;
  signUpObj = {
    name: '',
    email: '',
    password: ''
  };

  email_validation_msg = '';
  password_validation_msg = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePanel(): void {
    this.isSignDivVisible = !this.isSignDivVisible;
  }

  onRegister(): void {
    console.log('Register:', this.signUpObj);
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.email_validation_msg = this.loginForm.get('email')?.invalid ? 'Email invalide' : '';
      this.password_validation_msg = this.loginForm.get('password')?.invalid ? 'Mot de passe requis' : '';
      return;
    }

    console.log('Connexion:', this.loginForm.value);
  }
}
