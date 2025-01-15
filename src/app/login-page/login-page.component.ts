import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}