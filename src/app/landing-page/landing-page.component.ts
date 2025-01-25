import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonModule, FooterComponent, RouterOutlet, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
