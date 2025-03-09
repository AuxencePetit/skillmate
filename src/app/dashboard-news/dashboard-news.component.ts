import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CalendarModule } from 'primeng/calendar';  // Importation du module Calendar
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
import { CalendarComponent } from '../utilities-dashbord/calendar/calendar.component';
import { ClockComponent } from '../utilities-dashbord/clock/clock.component';
import { DonutChartComponent } from '../utilities-dashbord/donut-chart/donut-chart.component';



@Component({
  selector: 'app-dashboard-news',
  standalone: true,
  imports: [CommonModule, DragDropModule, CalendarModule, FormsModule, CalendarComponent,ClockComponent,DonutChartComponent],  // Ajout des modules nécessaires
  templateUrl: './dashboard-news.component.html',
  styleUrls: ['./dashboard-news.component.scss']
})
export class DashboardNewsComponent {
  widgets = [
    { id: 1, name: 'Horloge', component: 'clock', size: 1 },
    { id: 2, name: 'Calendrier', component: 'calendar', size: 2 },  // Le calendrier prend 2 de longueur et 1 de hauteur
    { id: 3, name: 'Statistiques', component: 'stats', size: 1 },
    { id: 4, name: 'Tâches', component: 'tasks', size: 1 },
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);
  }
}
