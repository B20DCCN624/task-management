import { Component, OnInit } from '@angular/core';
import { Task } from '../../service/task';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  allTask: Task [] = []
  titleName: string = ''

  constructor(
    private taskService: TaskService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTask().subscribe( data => {
      this.allTask = data;
    })
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe( data => {
      this.allTask = this.allTask.filter(item => item.id !== id);
      this.message.success("Xóa thành công");
    })
  }

  onSubmit() {
    this.searchTask(this.titleName);
    this.titleName = ""
  }

  private searchTask(title: string) {
    this.taskService.searchByName(title).subscribe( data => {
      this.allTask = data;
    })
  }
}
