
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartDataset } from 'chart.js';
import { SubmissionsEvaluationService } from './submissions-evaluation.service';
import { DistrictsService } from '../districts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'submissions-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './submissions-evaluation.html',
  styleUrls: ['./submissions-evaluation.css'],
})
export class SubmissionEvaluation implements OnInit {
  districts: { id: string, name: string }[] = [];
  selectedDistrict: string | null = null;

  chartLabels: string[] = [];
  chartData: any[] = [];
  loading = false;
  error = '';

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Submissions',
          font: { size: 13, weight: 'bold' }
        }
      },
      y1: {
        position: 'right',
        title: {
          display: true,
          text: '% of Submissions Evaluated',
          font: { size: 13, weight: 'bold' }
        },
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'School',
          font: { size: 13, weight: 'bold' }
        }
      }
    }
  };

  constructor(
    private submissionsService: SubmissionsEvaluationService,
    private districtsService: DistrictsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDistricts(); 
    this.updateChart();
  }

  loadDistricts() {
    this.districtsService.getDistricts().subscribe({
      next: (resp) => {
        this.districts = resp.data.map((d:any ) => ({ id: d.id, name: d.name}));
      },
      error: () => {}
    });
  }

  updateChart() {
    this.loading = true;
    this.error = '';
    this.chartLabels = [];
    this.chartData = [];

    this.submissionsService.getEvaluation(this.selectedDistrict).subscribe({
      next: (apiData) => {
        if (apiData?.success && Array.isArray(apiData.data)) {
          this.chartLabels = apiData.data.map((school: any) => school.school_name);

          this.chartData = [
            {
              type: 'bar',
              label: 'No. of Submissions',
              data: apiData.data.map((school: any) => school.total_submissions ?? 0),
              backgroundColor: [
                '#b3cce6', '#7bb3d4', '#4897c5', '#004e7c', '#9ecae1'
              ],
              yAxisID: 'y',
              order: 2
            },
            {
              type: 'line',
              label: '% of Submissions Evaluated',
              data: apiData.data.map((school: any) => school.completion_percentage ?? 0),
              yAxisID: 'y1',
              borderColor: '#e74c3c',
              backgroundColor: 'rgba(231,76,60,0.15)',
              pointBackgroundColor: '#e74c3c',
              fill: false,
              tension: 0.4,
              order: 1
            }
          ];
        } else {
          this.error = 'API response format not as expected.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load submissions data';
        this.loading = false;
        console.error('API error:', err);
      }
    });
  }

  onGoClick() {
    this.updateChart();
  }

  onBack(){
    this.router.navigate(["/"]);
  }
}
