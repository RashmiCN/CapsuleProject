import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParentTask, ITask } from './interfaces/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  base_url = 'http://localhost:8083/';

  constructor(private _http: HttpClient) { }

  addParent(parent): Observable<IParentTask> {
    return this._http.post<IParentTask>(this.base_url + 'addParentTask', parent, httpOptions);
  }

  getParents(id): Observable<IParentTask[]> {
    return this._http.get<IParentTask[]>(this.base_url + 'getParentTasks/' + id);
  }

  addTask(task): Observable<ITask> {
    return this._http.post<ITask>(this.base_url + 'addTask', task, httpOptions);
  }

  getTask(id): Observable<ITask> {
    return this._http.get<ITask>(this.base_url + 'getTask/' + id);
  }

  getTasks(id): Observable<ITask[]> {
    return this._http.get<ITask[]>(this.base_url + 'getTasks/' + id);
  }

  setTaskAsComplete(id): Observable<ITask> {
    return this._http.put<ITask>(this.base_url + 'completeTask/' + id, httpOptions);
  }

  editTask(id, task) {
    return this._http.put<ITask>(this.base_url + 'editTask/' + id, task, httpOptions);
  }
}
