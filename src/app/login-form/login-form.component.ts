import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [PasswordModule
    , FloatLabelModule
    , InputTextModule
    , ButtonModule
    , CommonModule
    , ReactiveFormsModule
    , HttpClientModule,RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  providers: [AuthService]
})
export class LoginFormComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailError(): string | null {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) return 'L\'email est requis.';
    if (email?.hasError('email')) return 'L\'email n\'est pas valide.';
    return null;
  }

  get passwordError(): string | null {
    const password = this.loginForm.get('password');
    if (password?.hasError('required')) return 'Le mot de passe est requis.';
    return null;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Connexion réussie, utilisateur connecté :', response.user);
          this.router.navigate(['/dashboard']); // Rediriger après connexion
        },
        error: (err) => {
          console.error('Erreur lors de la connexion :', err);
        },
      });
    }
  }
}
