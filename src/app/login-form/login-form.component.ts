import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-form',
  imports: [PasswordModule, FloatLabelModule, InputTextModule,ButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  username!: string;
  value!: string;
  
  constructor() { }

  ngOnInit(): void {
    // Initialization logic her
    
  }

}
