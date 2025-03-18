import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CompetenceService } from '../services/competence.service';
import { CategoriesService } from '../services/categories.service';
import { Competence } from '../models/personnel.model';
import { Categorie } from '../models/personnel.model';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-competences-list',
  imports: [TableModule, SelectModule, TagModule,FormsModule, ChipModule],
  templateUrl: './competences-list.component.html',
  styleUrl: './competences-list.component.scss'
})
export class CompetencesListComponent {
  competences: Competence[] = [];
  categories: Categorie[] = [];
  selectedCategories!: Competence;
  constructor(private competencesService: CompetenceService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.competencesService.getCompetences().subscribe(
      (competences: Competence[]) => {
        this.competences = competences;
        console.log(this.competences);
      }
      
    );
    this.categoriesService.getCategories().subscribe(
        (categories: Categorie[]) => {
          this.categories = categories;
          console.log(this.categories);
        }
    );
  }

  getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'A':
        return 'info';
      case 'B':
        return 'success';
      case 'C':
        return 'warn';
      case 'E':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  filter(value: string, field: keyof Competence) {
    if (value) {
      this.competences = this.competences.filter(competence => competence[field] === value);
    } else {
      this.competencesService.getCompetences().subscribe((competences: Competence[]) => {
        this.competences = competences;
      });
    }
  }

  getDescCategorie(id: String): string {
    return this.categories.find(categorie => categorie.idCategorie === id)?.description || '';
  }
}
