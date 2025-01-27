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

@Component({
  selector: 'app-register-form',
  imports: [
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  providers: [AuthService],
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        date_naissance: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  get lastNameError(): string | null {
    const lastName = this.registerForm.get('lastName');
    return lastName?.hasError('required') ? 'Le nom est requis.' : null;
  }

  get firstNameError(): string | null {
    const firstName = this.registerForm.get('firstName');
    return firstName?.hasError('required') ? 'Le prénom est requis.' : null;
  }

  get emailError(): string | null {
    const email = this.registerForm.get('email');
    if (email?.hasError('required')) return "L'email est requis.";
    if (email?.hasError('email')) return "L'email n'est pas valide.";
    return null;
  }

  get passwordError(): string | null {
    const password = this.registerForm.get('password');
    return password?.hasError('required')
      ? 'Le mot de passe est requis.'
      : password?.hasError('minlength')
      ? 'Le mot de passe doit comporter au moins 6 caractères.'
      : null;
  }

  get date_naissanceError(): string | null {
    const date_naissance = this.registerForm.get('date_naissance');
    return date_naissance?.hasError('required')
      ? 'La date de naissance est requise.'
      : null;
  }

  private passwordsMatchValidator(
    formGroup: FormGroup
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get confirmPasswordError(): string | null {
    const confirmPassword = this.registerForm.get('confirmPassword');
    if (confirmPassword?.hasError('required'))
      return 'La confirmation du mot de passe est requise.';
    if (this.registerForm.hasError('passwordsMismatch'))
      return 'Les mots de passe ne correspondent pas.';
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { prenom, nom, email, password, date_naissance } =
        this.registerForm.value;

      const userToRegister = {
        prenom,
        nom,
        email,
        password,
        date_naissance,
        statut: 'Employé',
        date_embauche: new Date().toISOString().split('T')[0],
      };

      this.authService.register(userToRegister).subscribe({
        next: (response) => {
          console.log('Inscription réussie, utilisateur créé :', response.user);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error("Erreur lors de l'inscription :", err);
        },
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
