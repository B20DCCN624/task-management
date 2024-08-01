import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';
import { Task } from '../../service/task';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.css'
})
export class PostTaskComponent {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private message: NzMessageService
  ) {}

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl([Validators.required]),
    status: new FormControl('')
  })

  //getter
  get title() { return this.postForm.get('title'); }
  get description() { return this.postForm.get('description'); }
  get date() { return this.postForm.get('date'); }
  get status() { return this.postForm.get('status'); }

  formData: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    status: ''
  };

  onSubmit() {
    this.taskService.addTask(this.formData).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home']);
      this.message.success("Thêm task thành công")
    })
  }

}
