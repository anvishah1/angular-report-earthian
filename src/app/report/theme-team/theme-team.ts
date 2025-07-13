import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BaseChartDirective } from "ng2-charts";
import { CommonModule } from "@angular/common";
import { ChartOptions } from "chart.js";

@Component({
  selector: 'app-theme-Team-report',
  standalone: true,
  imports: [CommonModule,BaseChartDirective,FormsModule],
  templateUrl: './theme-team.html',
  styleUrls: ["./theme-team.css"]
})
export class Themeteam {
  districts=[
    { id: 1, name: 'District 1' },
    { id: 2, name: 'District 2' },
    { id: 3, name: 'District 3' },
    { id: 4, name: 'District 4' }
  ];

  schools = [
    { id: 1, name: 'School A', districtId: 1, Theme_Air: 10, Theme_Water: 5, Theme_Biodiversity: 8 },
    { id: 2, name: 'School B', districtId: 1, Theme_Air: 7, Theme_Water: 12, Theme_Biodiversity: 6 },
    { id: 3, name: 'School C', districtId: 2, Theme_Air: 15, Theme_Water: 9, Theme_Biodiversity: 11 },
    { id: 4, name: 'School D', districtId: 3, Theme_Air: 4, Theme_Water: 7, Theme_Biodiversity: 3 },
    { id: 5, name: 'School E', districtId: 4, Theme_Air: 11, Theme_Water: 8, Theme_Biodiversity: 9 },
    { id: 5, name: 'School F', districtId: 4, Theme_Air: 10, Theme_Water: 8, Theme_Biodiversity: 9 }
  ];

  selectedDistrict: number|null = null;
  

  themeWiseLabels: string[] = [];
  themeWiseData: any[] = [];

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
        }
      }
    }
  };

  ngOnInit() {
    this.updateChartData();
  }

  get filteredSchools() {
    if(this.selectedDistrict=== null){
      return this.schools;
    }
    return this.schools.filter(s => s.districtId === this.selectedDistrict);
  }

  updateChartData() {
    const schools=this.filteredSchools;
    this.themeWiseLabels = schools.map(s=>s.name);
    this.themeWiseData =[
      {data: schools.map(s=> s.Theme_Air), label: 'Theme_Air'},
      {data: schools.map(s=> s.Theme_Water), label: 'Theme_Water'},
     {data: schools.map(s=> s.Theme_Biodiversity), label: 'Theme_Biodiversity'},
    ];
  }

  onGoClick() {
    this.updateChartData();
  }

}

