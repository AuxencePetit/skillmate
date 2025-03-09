import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-donut-chart',
  imports: [ChartModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent {
  donutChartData: any;
  chartOptions: any;  // Définir la propriété chartOptions

  constructor() {
    this.donutChartData = {
      labels: ['Réussi', 'Échoué', 'En Cours'],
      datasets: [
        {
          data: [70, 20, 10],
          backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
          hoverBackgroundColor: ['#45a049', '#e53935', '#fb8c00'],
          borderWidth: 2
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      aspectRatio: 1,  // Maintient un ratio carré
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 10,  // Réduit la taille des labels de la légende
              weight: 'normal'
            },
            padding: 5  // Réduit l'espace autour des labels
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%';
            }
          },
          bodyFont: {
            size: 10,  // Réduit la taille de la police dans les tooltips
          }
        }
      },
      cutoutPercentage: 70,  // Trou au centre du donut
      maintainAspectRatio: true,
    };
  }
}
