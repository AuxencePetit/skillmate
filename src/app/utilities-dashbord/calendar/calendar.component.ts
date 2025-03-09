import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ajouter CommonModule
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],  // Assure-toi que CommonModule est importé
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  daysOfWeek: string[] = [];
  weekDates: Date[] = [];

  ngOnInit(): void {
    this.generateCurrentWeek();
  }

  generateCurrentWeek(): void {
    const startOfWeek = this.getStartOfWeek(this.currentDate);
    this.weekDates = [];
    this.daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      this.weekDates.push(day);
      this.daysOfWeek.push(day.toLocaleDateString('fr-FR', { weekday: 'long' }));
    }
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay() || 7; // make Sunday (0) as 7
    const start = new Date(date);
    start.setDate(date.getDate() - day + 1); // Adjust to Monday
    return start;
  }

  isCurrentDay(date: Date): boolean {
    return date.toDateString() === this.currentDate.toDateString();
  }

  isPastDay(date: Date): boolean {
    // Compare the date with the current date
    return date < this.currentDate;
  }
}
