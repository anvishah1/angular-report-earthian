import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ThemeWiseTeamService } from './theme-team.service';

@Component({
  selector: 'app-theme-team-report',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './theme-team.html',
  styleUrls: ['./theme-team.css']
})
export class Themeteam implements OnInit {
  districts = [
    { id: '1', name: 'District 1' },
    { id: '2', name: 'District 2' },
    { id: '3', name: 'District 3' },
    { id: '4', name: 'District 4' }
  ];
  selectedDistrict: string | null = null;

  themeWiseLabels: string[] = [];
  themeWiseData: ChartDataset<'bar'>[] = [];
  loading = false;
  error = '';

  themeWiseOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Theme-wise Team Distribution by School",
        align: 'center',
        font: { size: 14, weight: "bold" },
        color: "#333"
      }
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
          text: 'Number of Teams',
          font: { size: 14, weight: 'bold' }
        },
        min: 0
      }
    }
  };

  constructor(private themeTeamService: ThemeWiseTeamService) {}

  ngOnInit() {
    this.loadChartData();
  }

  onGoClick() {
    this.loadChartData();
  }

  loadChartData() {
    this.loading = true;
    this.error = '';
    this.themeWiseLabels = [];
    this.themeWiseData = [];

    this.themeTeamService.getThemeWise(this.selectedDistrict).subscribe({
      next: (apiData) => {
        if (apiData?.success && Array.isArray(apiData.data)) {
          // 1. Get all unique theme_ids (and optionally their "display name" from another source if you have)
          const themeIdSet = new Set<string>();
          apiData.data.forEach((school: any) => {
            if (school.theme_count) {
              Object.keys(school.theme_count).forEach(tid => themeIdSet.add(tid));
            }
          });
          const allThemes = Array.from(themeIdSet);

          // 2. X-axis labels: school names
          this.themeWiseLabels = apiData.data.map((sch: any) => sch.school_name);

          // 3. For each theme, get an array of team counts for each school (0 if theme not present)
          this.themeWiseData = allThemes.map((themeId, idx) => ({
            type: 'bar',
            label: themeId, // ideally replace with theme name mapping
            data: apiData.data.map((sch: any) => sch.theme_count?.[themeId] ?? 0),
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
        console.error('API load error:', err);
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
