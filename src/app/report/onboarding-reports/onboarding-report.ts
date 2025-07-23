import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BaseChartDirective} from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-report',
  standalone: true,
  imports: [CommonModule,FormsModule,BaseChartDirective],
  templateUrl: './onboarding-report.html',
  styleUrls: ['./onboarding-report.css']
})
export class OnboardingReport {
districts = [
  { id: 1, name: 'District 1' },
  { id: 2, name: 'District 2' },
  { id: 3, name: 'District 3' },
  { id: 4, name: 'District 4' }
];

schools = [
  { id: 1, name: 'School A', districtId: 1 },
  { id: 2, name: 'School B', districtId: 1 },
  { id: 3, name: 'School C', districtId: 2 },
  { id: 4, name: 'School D', districtId: 3 }
];

teams = [
  { id: 1, name: 'Team Alpha', schoolId: 1 },
  { id: 2, name: 'Team Beta', schoolId: 2 },
  { id: 3, name: 'Team Gamma', schoolId: 3 }
];

// Example chart data
onboardedData = [
  { district: 'District 1', schools: 30, teachers: 100, teams: 50 },
  { district: 'District 2', schools: 25, teachers: 80, teams: 40 },
  { district: 'District 3', schools: 35, teachers: 120, teams: 60 }
];

orientationData = [
  { district: 'District 1', registered: 310, attended: 140, afterOrientation: 290 },
  { district: 'District 2', registered: 210, attended: 120, afterOrientation: 200 },
  { district: 'District 3', registered: 180, attended: 110, afterOrientation: 200 },
  { district: 'District 4', registered: 210, attended: 130, afterOrientation: 200 }
];

// For dropdown selection tracking
selectedDistrict: number | null = null;
selectedSchool: number | null = null;
selectedTeam: number | null = null;

// Chart labels and datasets for the first chart
onboardedChartLabels = this.onboardedData.map(d => d.district);
onboardedChartData = [
  { data: this.onboardedData.map(d => d.schools), label: 'Schools Onboarded' ,},
  { data: this.onboardedData.map(d => d.teachers), label: 'Teachers Onboarded' },
  { data: this.onboardedData.map(d => d.teams), label: 'Teams Onboarded' }
];

// Chart labels and datasets for the second chart
orientationChartLabels = this.orientationData.map(d => d.district);
orientationChartData = [
  { data: this.orientationData.map(d => d.registered), label: 'Schools Registered' },
  { data: this.orientationData.map(d => d.attended), label: 'Teachers Attended Orientation' },
  { data: this.orientationData.map(d => d.afterOrientation), label: 'Schools Registered After Orientation' }
];

// Chart options


// Chart 1: Onboarded Data
onboardedChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Total Onboarded Schools, Teachers and Teams",
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
        text: 'Count',
        font: { size: 14, weight: 'bold' }
      }
    }
  }
};

// Chart 2: Orientation Data
orientationChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Schools, Teachers Attended Orientation & Registers by District",
      align: 'center',
      font: { size: 14, weight: "bold" },
      color: "#333"
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'District',
        font: { size: 14, weight: 'bold' }
      }
    },
    y: {
      title: {
        display: true,
        text: 'Count',
        font: { size: 14, weight: 'bold' }
      }
    }
  }
};

filterData() {
  let filteredOnboarded = this.onboardedData;
  let filteredOrientation = this.orientationData;

  // Filter by district
  if (this.selectedDistrict!=null) {
      const DistrictName = this.getDistrictName(this.selectedDistrict);
    filteredOnboarded = filteredOnboarded.filter(d => d.district === DistrictName);
    filteredOrientation = filteredOrientation.filter(d => d.district === DistrictName);
  }

  // (Add similar logic for school and team if your data supports it)

  // Update chart data and labels
  this.onboardedChartLabels = filteredOnboarded.map(d => d.district);
  this.onboardedChartData = [
    { data: filteredOnboarded.map(d => d.schools), label: 'Schools Onboarded' },
    { data: filteredOnboarded.map(d => d.teachers), label: 'Teachers Onboarded' },
    { data: filteredOnboarded.map(d => d.teams), label: 'Teams Onboarded' }
  ];

  this.orientationChartLabels = filteredOrientation.map(d => d.district);
  this.orientationChartData = [
    { data: filteredOrientation.map(d => d.registered), label: 'Schools Registered' },
    { data: filteredOrientation.map(d => d.attended), label: 'Teachers Attended Orientation' },
    { data: filteredOrientation.map(d => d.afterOrientation), label: 'Schools Registered After Orientation' }
  ];
}

// Helper to get district name by ID
getDistrictName(id: number): string {
  const district = this.districts.find(d => d.id === id);
  return district ? district.name : '';
}

get filteredSchools() {
  if (this.selectedDistrict === null) {
    return [];
  }
  return this.schools.filter(s => s.districtId === this.selectedDistrict);
}

get filteredTeams() {
  if (this.selectedSchool === null) {
    return [];
  }
  return this.teams.filter(t => t.schoolId === this.selectedSchool);
}

onDistrictChange() {
  // Reset school and team selection when district changes
  this.selectedSchool = null;
  this.selectedTeam = null;
}

onSchoolChange() {
  // Reset team selection when school changes
  this.selectedTeam = null;
}

onBack(){

}


}
