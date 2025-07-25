
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartDataset } from 'chart.js';
import { OverallSubmissionsService } from './overall-submissions.service';
import { DistrictsService } from '../districts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overall-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './overall-submissions.html',
  styleUrls: ['./overall-submissions.css']
})
export class OverallSubmissions implements OnInit {
  loading = false;
  error = '';

  districts: { id: string, name: string }[] = []; 
  selectedDistrict: string | null = null;

  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Submissions per School',
        align: 'center',
        font: { size: 16, weight: 'bold' },
        color: '#333'
      },
      legend: { display: true }
    },
    scales: {
      y: {
        title: { display: true, text: 'Total Submissions', font: { size: 14, weight: 'bold' } },
        beginAtZero: true
      },
      y1: {
        position: 'right',
        title: { display: true, text: 'Completion %', font: { size: 14, weight: 'bold' } },
        min: 0, max: 100,
        grid: { drawOnChartArea: false }
      },
      x: {
        title: { display: true, text: 'School', font: { size: 14, weight: 'bold' } }
      }
    }
  };

  constructor(
    private overallService: OverallSubmissionsService,
    private districtsSerivce: DistrictsService,
    private router: Router ) {}

  ngOnInit() {
    this.loadDistricts();
    this.loadChart();
  }

  loadDistricts(){
    this.districtsSerivce.getDistricts().subscribe({
      next: (resp)=>{
        this.districts = resp.data.map((d: any) => ({ id: d.id, name: d.name}));
      },
      error: () => {
      }
    });
  }

  onGoClick() {
    this.loadChart();
  }

  onBack() {
    this.router.navigate(['/']);
  }

  
  loadChart() {
    this.loading = true;
    this.error = '';
    this.chartLabels = [];
    this.chartData = [];

    this.overallService.getOverallSubmissions(this.selectedDistrict).subscribe({
      next: (apiData) => {
        if (apiData?.success && Array.isArray(apiData.data)) {

          const filtered = apiData.data.filter((sch: any) => sch.total_submissions > 0);
          this.chartLabels = filtered.map((sch: any) => sch.school_name);

          const totals = filtered.map((sch: any) => sch.total_submissions);
          const completions = filtered.map((sch: any) => sch.completion_percentage);

          this.chartData = [
            {
              type: 'bar',
              label: 'Total Submissions',
              data: totals,
              backgroundColor: '#6baed6',
              order: 2

            },
            {
              type: 'line',
              label: 'Completion %',
              data: completions,
              yAxisID: 'y1',
              borderColor: '#d62728',
              backgroundColor: '#d62728',
              fill: false,
              tension: 0.3,
              pointRadius: 5,
              pointBackgroundColor: '#d62728',
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
}
