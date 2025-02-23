import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../service/task';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HammerModule } from '@angular/platform-browser';

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
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NzModalModule,
    NzButtonModule,
    HammerModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  allTask: Task [] = []
  initialFormValue: any;
  titleName: string = ''
  isVisible = false;

  showModal(id: number): void {
    this.isVisible = true;
    this.getById(id);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.onEdit();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.taskService.getAllTask().subscribe( data => {
      this.allTask = data;
    })

    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'));
      this.getById(id);
    })
  }


  constructor(
    private taskService: TaskService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // search
  onSubmit() {
    this.searchTask(this.titleName);
    this.titleName = ""
  }

  private searchTask(title: string) {
    this.taskService.searchByName(title).subscribe( data => {
      this.allTask = data;
    })
  }

  //edit
  updateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl([Validators.required]),
    status: new FormControl('')
  })
  //getter
  get title() { return this.updateForm.get('title'); }
  get description() { return this.updateForm.get('description'); }
  get date() { return this.updateForm.get('date'); }
  get status() { return this.updateForm.get('status'); }

  formData: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    status: ''
  };

  getById(id: number) {
    this.taskService.getTaskById(id).subscribe( data => {
      this.formData = data;
    })
  }

  onEdit() {
    this.taskService.updateTask(this.formData).subscribe( (data) => {
      this.message.success('Cập nhật thành công');
      this.isVisible = false;
        // Tự động lấy lại dữ liệu
      this.taskService.getAllTask().subscribe(updatedData => {
        this.allTask = updatedData;
      });
    });
  }

  //delete
  delete(id: number) {
    this.taskService.deleteTask(id).subscribe( data => {
      this.allTask = this.allTask.filter(item => item.id !== id);
      this.message.success("Xóa thành công");
    })
  }
}
