import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Task } from '../../service/task';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  initialFormValue: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {}

  updateForm: FormGroup = new FormGroup ({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl([Validators.required]),
    priority: new FormControl(''),
    employee: new FormControl('', [Validators.required])
  })

  //getter
  get title() { return this.updateForm.get('title'); }
  get description() { return this.updateForm.get('description'); }
  get date() { return this.updateForm.get('date'); }
  get priority() { return this.updateForm.get('priority'); }
  get employee() { return this.updateForm.get('employee'); }

  formData: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    priority: '',
    employee: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'));
      this.getById(id);
    })

    this.initialFormValue = this.updateForm.value;
  }

  getById(id: number) {
    this.taskService.getTaskById(id).subscribe( data => {
      this.formData = data;
      this.updateForm.patchValue({
        title: data.title,
        description: data.description,
        date: data.date,
        priority: data.priority,
        employee: data.employee
      });
      this.initialFormValue = this.updateForm.value;
    })
  }

  isFormChanged(): boolean {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.updateForm.value);
  }

  onSubmit() {
    this.taskService.updateTask(this.formData).subscribe( data => {
      this.router.navigate(['/home']);
      this.message.success("Cập nhật thành công");
    })
  }
}
