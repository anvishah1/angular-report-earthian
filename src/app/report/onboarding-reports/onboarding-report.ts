import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BaseChartDirective} from 'ng2-charts'

@Component({
  selector: 'app-onboarding-report',
  standalone: true,
  imports: [FormsModule,BaseChartDirective],
  templateUrl: './onboarding-report.html',
  styleUrls: ['./onboarding-report.css']
})
export class OnboardingReport {
  // Example: onboarding-report.component.ts

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
  { data: this.onboardedData.map(d => d.schools), label: 'Schools Onboarded' },
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
chartOptions = {
  responsive: true,
  // Add more options if needed
};

}
