import { Component, OnInit } from '@angular/core';
import { Task } from '../../service/task';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Comment } from '../../service/comment';
import { FormGroup, FormsModule, FormControlName, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  allComment: Comment [] = []

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })

  formData: Task = {
    id: 0,
    title: '',
    description: '',
    date: new Date(),
    priority: '',
    employee: ''
  };

  formComment: Comment = {
    id: 0,
    comment: ''
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        let id = Number (param.get('id'));
        this.getById(id);
      })

      this.loadComment()
  }

  getById(id: number) {
    this.taskService.getTaskById(id).subscribe( data => {
      this.formData = data;
    })
  }

  loadComment() {
    this.taskService.getAllComment().subscribe(data => {
      this.allComment = data;
    })
  }

  onSubmit() {
    this.taskService.addComment(this.formComment).subscribe( data => {
      this.loadComment()
      this.formComment.comment=''
    })
  }

  goBack() {
    this.location.back();
  }
}
