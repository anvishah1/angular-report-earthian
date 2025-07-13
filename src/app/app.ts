import { Component, signal } from '@angular/core';
//import { OnboardingReport } from './report/onboarding-reports/onboarding-report';
//import { MainMenu } from './main-menu/main-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('onboarding-dashboard');
}
