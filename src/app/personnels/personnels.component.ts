import { Component } from '@angular/core';
import { PersonnelService } from '../services/personnel.service';
import { Personnel } from '../models/personnel.model';
import { CommonModule } from '@angular/common';
import { CompetenceService } from '../services/competence.service';
import { FormsModule } from '@angular/forms';

//import primeNg modules
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-personnels',
  imports: [
    CardModule, 
    ButtonModule, 
    CommonModule,
    FormsModule , 
    TagModule, 
    TooltipModule, 
    AvatarModule, 
    AvatarGroupModule, 
    IconFieldModule, 
    InputIconModule, 
    AutoCompleteModule,
    InputTextModule],
  templateUrl: './personnels.component.html',
  styleUrl: './personnels.component.scss'
})
export class PersonnelsComponent {
  personnels :Personnel[] = [];
  filteredPersonnels: Personnel[] = [];
  search: string = '';


  constructor(private personnelsService: PersonnelService, private competenceService: CompetenceService, private router: Router) {}

  ngOnInit() {
    this.personnelsService.getPersonnels().subscribe((data: any) => {
      this.personnels = data;
      this.filteredPersonnels = data;
      for (let personnel of this.personnels) {
      this.competenceService.getCompetencesByUserId(personnel.idUtilisateur).subscribe((data: any) => {
        personnel.competences = data;

      });
    }
    });
  }
  onSelect(id: number) {
    this.router.navigate(['dashboard/profile', id]);
  }

  searchPersonnel() {
    const searchTerm = this.search.toLowerCase().trim();
    this.filteredPersonnels = this.personnels.filter((perso) =>
      `${perso.nom} ${perso.prenom}`.toLowerCase().includes(searchTerm)
    );
  }

}
