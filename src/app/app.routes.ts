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
  },

  {
   path: 'theme-team',
     loadComponent: () => import('./report/theme-team/theme-team').then(m => m.Themeteam)
  },

  {
    path: 'overall-submissions',
    loadComponent: () => import('./report/overall-submissions/overall-submissions').then(m => m.OverallSubmissions)
 },
 {
  path: 'target-insights',
  loadComponent: () => import('./report/target-insights/target-insights').then(m => m.TargetInsights)
},
{
  path: 'theme-avg',
  loadComponent: () => import('./report/theme-avg/theme-avg').then(m => m.ThemeAvg)
},
{
  path: 'submissions-evaluation',
  loadComponent: () => import('./report/submissions-evaluation/submissions-evaluation').then(m => m.SubmissionEvaluation)
},
  
  // ...add more routes as needed
];
