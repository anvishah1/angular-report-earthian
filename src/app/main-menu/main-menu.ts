import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Main Menu</h1>
    <ul>
      <li><a routerLink="/onboarding-report">Onboarding Report</a></li>
      <li><a routerLink="/theme-team">Theme Team</a></li>
      <li><a routerLink="/overall-submissions">Overall Submissions</a></li>
      <li><a routerLink="/target-insights">Target Insights</a></li>
      <li><a routerLink="/theme-avg">Theme Avg</a></li>
      <li><a routerLink="/submissions-evaluation">Submissions Evaluation</a></li>
    </ul>
  `
})
export class MainMenuComponent {}
