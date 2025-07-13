import { Component, signal } from '@angular/core';
import { OnboardingReport } from './report/onboarding-reports/onboarding-report';

@Component({
  selector: 'app-root',
  imports: [OnboardingReport],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('onboarding-dashboard');
}
