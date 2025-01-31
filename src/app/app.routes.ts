import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonnelsComponent } from './personnels/personnels.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Route par défaut vers la landing page
  {
    path: 'auth',
    component: LoginPageComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'personnels', component: PersonnelsComponent}
    ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
