import { Component } from '@angular/core';
//import ce qui permet
import { CompetenceService } from '../services/competence.service';
import { CategoriesService } from '../services/categories.service';
import { Competence } from '../models/personnel.model';
import { Categorie } from '../models/personnel.model';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-competences-list',
  imports: [TableModule, SelectModule, TagModule],
  templateUrl: './competences-list.component.html',
  styleUrl: './competences-list.component.scss'
})
export class CompetencesListComponent {
  competences: Competence[] = [];
  categories: Categorie[] = [];
  selectedCompetence!: Competence;
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

  getSeverity(categorie: Categorie) {

    if (categorie.idCategorie === 'A') {
      return 'success';
    }
    else if (categorie.idCategorie === 'B') {
      return 'warning';
    }
    else if (categorie.idCategorie === 'C') {
      return 'danger';
    }
    else if (categorie.idCategorie === 'D') {
      return 'primary';
    }
      return 'info';
  }
}
