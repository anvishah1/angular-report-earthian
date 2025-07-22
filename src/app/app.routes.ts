import { Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu'; // <-- import main menu

export const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    pathMatch: 'full'
  },
  {
    path: 'menu', // <-- add main menu here
    component: MainMenuComponent
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
];
