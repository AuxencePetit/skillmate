import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {
  secondAngle: number = 0;
  minuteAngle: number = 0;
  hourAngle: number = 0;

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock(): void {
    const date = new Date();
    this.secondAngle = date.getSeconds() * 6;
    this.minuteAngle = date.getMinutes() * 6 + this.secondAngle / 60;
    this.hourAngle = (date.getHours() % 12) * 30 + this.minuteAngle / 12;
  }
}
