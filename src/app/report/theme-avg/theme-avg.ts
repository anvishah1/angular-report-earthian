import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ThemeAvgService } from './theme-avg.service';

@Component({
  selector: 'app-theme-avg',
  standalone: true,
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './theme-avg.html',
  styleUrl: './theme-avg.css'
})
export class ThemeAvg implements OnInit {
  districts: { id: string, name: string }[] = [];
  selectedDistrict: string | null = null;

  chartLabels: string[] = [];
  chartData: ChartDataset<'bar'>[] = [];
  loading = false;
  error = '';

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Theme-wise average score grouped by School",
        align: 'center',
        font: { size: 14, weight: "bold" },
        color: "#333"
      },
      legend: { display: true }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'School',
          font: { size: 14, weight: 'bold' }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Average score',
          font: { size: 14, weight: 'bold' }
        },
        min: 0,
        max: 100 // Set max as per your data
      }
    }
  };

  constructor(private themeAvgService: ThemeAvgService) {}

  ngOnInit() {
    this.loadDistricts();
    this.loadChartData();
  }

  onGoClick() {
    this.loadChartData();
  }

  loadDistricts() {
    this.districts = [
      { id: '1', name: 'District 1' },
      { id: '2', name: 'District 2' },
      { id: '198', name: 'District 3' }
    ];
  }

  loadChartData() {
    this.loading = true;
    this.error = '';
    this.chartLabels = [];
    this.chartData = [];

    this.themeAvgService.getThemeAvg(this.selectedDistrict).subscribe({
      next: (apiData) => {
        if (apiData?.success && Array.isArray(apiData.data)) {
          const themeSet = new Set<string>();
          apiData.data.forEach((school: any) => {
            if (school.themes && Array.isArray(school.themes)) {
              school.themes.forEach((t: any) => themeSet.add(t.theme_name));
            }
          });
          const allThemes = Array.from(themeSet);

          this.chartLabels = apiData.data.map((s: any) => s.school_name);

          this.chartData = allThemes.map((theme, idx) => ({
            type: 'bar',
            label: theme,
            data: apiData.data.map((school: any) => {
              const t = (school.themes || []).find((tt: any) => tt.theme_name === theme);
              return t ? t.average_score : 0;
            }),
            backgroundColor: this.pickColor(idx)
          }));

          this.error = '';
        } else {
          this.error = 'API response format not as expected.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data.';
        this.loading = false;
        console.error('API error:', err);
      }
    });
  }

  pickColor(idx: number) {
    const colors = [
      '#6baed6', '#f4a582', '#bcbddc', '#fd8d3c', '#e5c494', '#1b9e77', '#7570b3'
    ];
    return colors[idx % colors.length];
  }
}
