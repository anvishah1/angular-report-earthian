import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartDataset } from 'chart.js';
import { ThemeWiseTeamService } from './theme-team.service';
import { DistrictsService } from '../districts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme-team-report',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './theme-team.html',
  styleUrls: ['./theme-team.css']
})
export class Themeteam implements OnInit {
  districts: { id: string, name: string }[] = [];
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

  constructor(
    private themeTeamService: ThemeWiseTeamService,
    private districsService: DistrictsService,
    private router: Router ) {}

  ngOnInit() {
    this.loadChartData();
    this.loadDistricts();
  }

  loadDistricts() {
    this.districsService.getDistricts().subscribe({
      next: (resp) => {
        this.districts = resp.data.map((d: any) => ({ id: d.id, name: d.name}));
      },
      error: () => {

      }
    });
  }

  onGoClick() {
    this.loadChartData();
  }

  onBack() {
    this.router.navigate(['/']);
  }

  loadChartData() {
    this.loading = true;
    this.error = '';
    this.themeWiseLabels = [];
    this.themeWiseData = [];

    this.themeTeamService.getThemeWise(this.selectedDistrict).subscribe({
      next: (apiData) => {
        if (apiData?.success && Array.isArray(apiData.data)) {
          const themeIdSet = new Set<string>();
          apiData.data.forEach((school: any) => {
            if (school.theme_count) {
              Object.keys(school.theme_count).forEach(tid => themeIdSet.add(tid));
            }
          });
          const allThemes = Array.from(themeIdSet);

          this.themeWiseLabels = apiData.data.map((sch: any) => sch.school_name);

          this.themeWiseData = allThemes.map((themeId, idx) => ({
            type: 'bar',
            label: themeId, 
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
