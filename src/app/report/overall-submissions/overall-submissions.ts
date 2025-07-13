import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-overall-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './overall-submissions.html',
  styleUrls: ['./overall-submissions.css']
})
export class OverallSubmissions implements OnInit {
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

  // Example data; in production, fetch from API
  submissions = [
    { schoolId: 1, total: 10, completion: 70 },
    { schoolId: 2, total: 15, completion: 80 },
    { schoolId: 3, total: 12, completion: 75 },
    { schoolId: 4, total: 7, completion: 63 },
    { schoolId: 5, total: 14, completion: 72 }
  ];

  selectedDistrict: number | null = null;
  selectedSchool: number | null = null;
  selectedTeam: number | null = null;

  // Chart data
  chartLabels: string[] = [];
  barData: ChartDataset<'bar'>[] = [];
  lineData: ChartDataset<'line'>[] = [];
  chartData: ChartDataset[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Submissions per School & Percentage of Completed Submissions',
        align: 'center',
        font: { size: 16, weight: 'bold' },
        color: '#333'
      },
      legend: { display: false }
    },
    scales: {
      y: {
        title: { display: true, text: 'Total Submissions', font: { size: 14, weight: 'bold' } }
      },
      y1: {
        position: 'right',
        title: { display: true, text: 'Completion Percentage', font: { size: 14, weight: 'bold' } },
        min: 0,
        max: 100,
        grid: { drawOnChartArea: false }
      },
      x: {
        title: { display: true, text: 'School', font: { size: 14, weight: 'bold' } }
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
    // Filter submissions based on selected district and school
    let filtered = this.submissions;
    if (this.selectedDistrict) {
      const schoolIds = this.schools.filter(s => s.districtId === this.selectedDistrict).map(s => s.id);
      filtered = filtered.filter(sub => schoolIds.includes(sub.schoolId));
    }
    if (this.selectedSchool) {
      filtered = filtered.filter(sub => sub.schoolId === this.selectedSchool);
    }

    const schoolNames = filtered.map(sub => {
      const school = this.schools.find(s => s.id === sub.schoolId);
      return school ? school.name : '';
    });

    this.chartLabels = schoolNames;
    this.barData = [
      {
        type: 'bar',
        label: 'Total Submissions',
        data: filtered.map(sub => sub.total),
        backgroundColor: '#6baed6',
        order: 2
      }
    ];
    this.lineData = [
      {
        type: 'line',
        label: 'Completion Percentage',
        data: filtered.map(sub => sub.completion),
        yAxisID: 'y1',
        borderColor: '#d62728',
        backgroundColor: '#d62728',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#d62728',
        order: 1
      }
    ];
    this.chartData = [...this.barData, ...this.lineData];
  }

  onGoClick() {
    this.updateChart();
  }

  onBack() {
    // Implement navigation logic if needed
  }
}
