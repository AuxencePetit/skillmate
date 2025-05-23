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
import { MissionComponent } from './mission/mission.component';
import { DashboardNewsComponent } from './dashboard-news/dashboard-news.component';
import { CompetencesListComponent } from './competences-list/competences-list.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';


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
      {path: '', component: DashboardNewsComponent},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'personnels', component: PersonnelsComponent},
      {path: 'mission', component: MissionComponent},
      {path: 'competences', component: CompetencesListComponent},
      {path: 'profile/:id/edit', component: ProfileEditComponent },
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
