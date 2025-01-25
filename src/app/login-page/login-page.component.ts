import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
