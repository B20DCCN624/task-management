import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ChartComponent } from 'ngx-apexcharts';
import { NgxApexchartsModule } from 'ngx-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // dashboard
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private taskService: TaskService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 520,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
      this.pieCharData();
  }

  pieCharData() {
    this.taskService.getTaskCount().subscribe( data => {
      const status = Object.keys(data);
      const value = Object.values(data);

      this.chartOptions = {
        ...this.chartOptions,
        series: value,
        labels: status,
      }
    })
  }
}
