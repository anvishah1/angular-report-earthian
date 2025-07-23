import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { TargetInsightsService } from './target-insight.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-target-insights',
  standalone: true,
  imports: [FormsModule, BaseChartDirective, CommonModule],
  templateUrl: './target-insights.html',
  styleUrls: ['./target-insights.css']
})

export class TargetInsights implements OnInit {
  targetInsightLabels: string[] = ['Target Submissions', 'Actual Submissions'];
  targetInsightData: any[] = [
    {
      data: [0, 0],
      label: 'Submissions',
      backgroundColor: ['#1f77b4', '#2ca02c']
    }
  ];
  loading = true;
  error = '';

  targetInsightOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Target vs Actual Submissions",
        align: 'center',
        font: { size: 14, weight: "bold" },
        color: "#333"
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of Submissions",
          font: { size: 14, weight: "bold" }
        },
        min: 0
      }
    }
  };

  constructor(
    private insightsService: TargetInsightsService,
    private router: Router) {}

  ngOnInit() {
    this.insightsService.getTargetInsights().subscribe({
      next: (apiData) => {
        // Full API response
        console.log('Received API data:', apiData);
  
        const d = apiData?.data;
        // Log the extracted data object
        console.log('Extracted d:', d);
  
        // Log the values and their types
        console.log('d.target_submissions:', d?.target_submissions, 'type:', typeof d?.target_submissions);
        console.log('d.actual_submissions:', d?.actual_submissions, 'type:', typeof d?.actual_submissions);
  
        // Defensive null/NaN logging
        if (
          d &&
          d.target_submissions != null &&
          d.actual_submissions != null &&
          !isNaN(+d.target_submissions) &&
          !isNaN(+d.actual_submissions)
        ) {
          console.log('Format OK: setting chart data.');
          this.targetInsightData = [{
            data: [Number(d.target_submissions), Number(d.actual_submissions)],
            label: 'Submissions',
            backgroundColor: ['#1f77b4', '#2ca02c'],
          }];
          this.error = '';
        } else {
          this.error = "API response format not as expected.";
          console.warn('Unexpected API data format for chart:', d);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load insight data';
        this.loading = false;
        console.error('API load error:', err);
      }
    });
  }
  onBack() {
    this.router.navigate(['/']);
  }
  }
