import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { Task } from '../../service/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    NzCalendarModule,
    NzBadgeModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  tasks: Task[] = [];
  listDataMap: { [key: string]: { type: string, content: string }[] } = {};

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTask().subscribe(data => {
      this.tasks = data;
      this.mapTasksToDate();
    });
  }

  mapTasksToDate(): void {
    this.tasks.forEach(task => {
      const dateKey = this.formatDateKey(new Date(task.date));
      if (!this.listDataMap[dateKey]) {
        this.listDataMap[dateKey] = [];
      }
      this.listDataMap[dateKey].push({ type: 'success', content: task.title });
    });
  }

  formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
