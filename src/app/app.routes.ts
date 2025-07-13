import { Routes } from '@angular/router';
import { MainMenu } from './main-menu/main-menu';

export const routes: Routes = [
  {
    path: '',
    component: MainMenu, // This makes it the home page
    pathMatch: 'full'
  },
  {
    path: 'onboarding-report',
    loadComponent: () => import('./report/onboarding-reports/onboarding-report').then(m => m.OnboardingReport)
  }
//   {
//     path: 'your-new-report',
//     loadComponent: () => import('./report/your-new-report/your-new-report.component').then(m => m.YourNewReport)
//   },
  // ...add more routes as needed
];
