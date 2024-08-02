import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { title } from 'process';
import { TaskComponent } from "../task/task.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { combineLatest } from 'rxjs';
import { ScheduleComponent } from "../schedule/schedule.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzTabsModule,
    TaskComponent,
    DashboardComponent,
    ScheduleComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedTab: number = 0;

  tabs = [
    {title: 'Task', component: 'app-task'},
    {title: 'Dashboard', component: 'app-dashboard'},
    {title: 'Schedule', component: 'app-schedule'},
  ];

  onTabChange(index: number) {
    this.selectedTab = index;
  }
}
