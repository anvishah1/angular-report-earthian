import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-target-insights',
  standalone: true,
  imports: [FormsModule,BaseChartDirective,CommonModule],
  templateUrl: './target-insights.html',
  styleUrls: ['./target-insights.css']
})
export class TargetInsights {
targetInsightLabels = ['Target Submissions', 'Actual Submissions'];

 targetInsightData = [
  {
    data: [200, 150],
    label: 'Submissions',
    backgroundColor: ['#1f77b4', '#2ca02c'] // blue and green
  }
];

targetInsightOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Target vs Actual Submissions",
      align: 'center',
      font: {size: 14, weight: "bold"},
      color: "#333"
    }
  },
  scales: {
    y:{
      title:{
        display: true,
        text: "Number of Submissions",
        font: {size: 14, weight:"bold"}
      },
        min: 0,
        max: 200
      }
    }
  };
}
