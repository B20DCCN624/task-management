import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTask() {
    return this.httpClient.get<Task[]>('http://localhost:8080/getAllTask');
  }

  addTask(data: Task) {
    return this.httpClient.post<Task>('http://localhost:8080/addTask', data);
  }

  deleteTask(id: number) {
    return this.httpClient.delete<Task>(`http://localhost:8080/deleteTask/${id}`);
  }

  getTaskById(id: number) {
    return this.httpClient.get<Task>(`http://localhost:8080/getTask/${id}`);
  }

  updateTask(data: Task) {
    return this.httpClient.put<Task>(`http://localhost:8080/updateTask/${data.id}`, data);
  }

  searchByName(title: string) {
    return this.httpClient.get<Task[]>(`http://localhost:8080/searchByName?title=${title}`);
  }

  getTaskCount() {
    return this.httpClient.get<Task>('http://localhost:8080/taskCountsByStatus');
  }

  //Comment
  getAllComment() {
    return this.httpClient.get<Comment[]>('http://localhost:8080/comment');
  }

  addComment(data: Comment) {
    return this.httpClient.post<Comment>('http://localhost:8080/addComment', data);
  }

}
