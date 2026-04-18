import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalAdmin: number = 0;
  totalEntreprise: number = 0;
  totalEmployer: number = 0;
  totalParticulier: number = 0;

  myGroup: FormGroup;

  private percentageChart?: Chart;
  private timer: any;

  constructor(private router: Router, private service: CrudService) {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });

    Chart.register(...registerables);
  }

  ngOnInit(): void {
   
    this.loadStats();

  
    this.timer = setInterval(() => {
      this.loadStats();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);

    
    if (this.percentageChart) {
      this.percentageChart.destroy();
      this.percentageChart = undefined;
    }
  }

  loadStats() {
    forkJoin({
      admins: this.service.getAdmin(),
      Entreprises: this.service.getRentreprise(),
      Employer: this.service.getEmployer(),
      Particulier: this.service.getParticulier()
    }).subscribe({
      next: ({ admins, Entreprises, Employer, Particulier }) => {
        this.totalAdmin = admins?.length || 0;
        this.totalEntreprise = Entreprises?.length || 0;
        this.totalEmployer = Employer?.length || 0;
        this.totalParticulier = Particulier?.length || 0;

        this.renderOrUpdatePercentageChart();
      },
      error: (err) => {
        console.error('Erreur loadStats:', err);
      }
    });
  }

  renderOrUpdatePercentageChart() {
    const total =
      this.totalAdmin +
      this.totalEntreprise +
      this.totalEmployer +
      this.totalParticulier;

    const percentageAdmin = total ? (this.totalAdmin / total) * 100 : 0;
    const percentageEntreprise = total ? (this.totalEntreprise / total) * 100 : 0;
    const percentageEmployer = total ? (this.totalEmployer / total) * 100 : 0;
    const percentageParticulier = total ? (this.totalParticulier / total) * 100 : 0;

    
    if (this.percentageChart) {
      this.percentageChart.data.labels = [
        'Admin',
        'Entreprise',
        'Employer',
        'Particulier'
      ];

      this.percentageChart.data.datasets[0].data = [
        percentageAdmin,
        percentageEntreprise,
        percentageEmployer,
        percentageParticulier
      ];

      this.percentageChart.update();
      return;
    }

   
    this.percentageChart = new Chart('percentageCanvas', {
      type: 'pie',
      data: {
        labels: ['Admin', 'Entreprise', 'Employer', 'Particulier'],
        datasets: [{
          label: 'Pourcentage global',
          data: [
            percentageAdmin,
            percentageEntreprise,
            percentageEmployer,
            percentageParticulier
          ],
          backgroundColor: [
            '#ce6316ff',
            '#ab1d07ff', 
            '#ffc107', 
            '#6f42c1'  
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Pourcentage Admin / Entreprise / Employer / Particulier'
          },
          tooltip: {
            callbacks: {
label: (ctx) => `${ctx.label}: ${Number(ctx.raw)?.toFixed(1)} %`
            }
          }
        }
      }
    });
  }

}
