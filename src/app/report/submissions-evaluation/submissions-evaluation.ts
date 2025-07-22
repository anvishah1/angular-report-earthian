import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'submissions-evaluation',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './submissions-evaluation.html',
  styleUrls: ['./submissions-evaluation.css'],
})
export class SubmissionEvaluation implements OnInit {
  districts = [
    { id: 1, name: 'District 1' },
    { id: 2, name: 'District 2' },
    { id: 3, name: 'District 3' }
  ];

  schools = [
    { id: 1, name: 'School A', districtId: 1 },
    { id: 2, name: 'School B', districtId: 1 },
    { id: 3, name: 'School C', districtId: 2 },
    { id: 4, name: 'School D', districtId: 3 },
    { id: 5, name: 'School E', districtId: 3 }
  ];

  submissions = [
    { schoolId: 1, total: 10, completion: 70 },
    { schoolId: 2, total: 15, completion: 80 },
    { schoolId: 3, total: 12, completion: 75 },
    { schoolId: 4, total: 7, completion: 63 },
    { schoolId: 5, total: 14, completion: 72 }
  ];

  selectedDistrict: number | null = null;

  chartLabels: string[] = [];
  chartData: ChartDataset<'bar' | 'line', number[]>[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: {
        display: false
      }
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

  ngOnInit() {
    this.updateChart();
  }

  get filteredSchools() {
    if (!this.selectedDistrict) return this.schools;
    return this.schools.filter(s => s.districtId === this.selectedDistrict);
  }

  updateChart() {
    // Filter submissions based on selected district
    let filtered = this.selectedDistrict
      ? this.submissions.filter(sub =>
          this.schools.some(s => s.id === sub.schoolId && s.districtId === this.selectedDistrict)
        )
      : this.submissions;

    const schoolNames = filtered.map(sub => {
      const school = this.schools.find(s => s.id === sub.schoolId);
      return school ? school.name : '';
    });

    this.chartLabels = schoolNames;
    this.chartData = [
      {
        type: 'bar',
        label: 'No. of Submissions',
        data: filtered.map(sub => sub.total),
        backgroundColor: [
          '#b3cce6', '#b3cce6', '#7bb3d4', '#4897c5', '#004e7c'
        ],
        yAxisID: 'y',
        order: 2
      },
      {
        type: 'line',
        label: '% of Submissions Evaluated',
        data: filtered.map(sub => sub.completion),
        yAxisID: 'y1',
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231,76,60,0.15)',
        pointBackgroundColor: '#e74c3c',
        fill: false,
        tension: 0.4,
        order: 1
      }
    ];
  }

  onGoClick() {
    this.updateChart();
  }
}
