import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
  TaskInsertModel,
  TaskModel,
  TaskUpdateModel,
} from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  readonly api = environment.api.tasks;
  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.api}/tasks`);
  }

  getTask(id: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.api}/tasks/${id}`);
  }

  postTask(task: TaskInsertModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.api}/tasks`, task);
  }

  patchTask(id: number, task: TaskUpdateModel): Observable<TaskModel> {
    // assert(id !== null && id !== undefined);
    return this.http.patch<TaskModel>(`${this.api}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${this.api}/tasks/${id}`);
  }
}
