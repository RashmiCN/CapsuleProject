import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './interfaces/Task';
import { IParentTask } from './interfaces/ParentTask';

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

  getParents(): Observable<IParentTask[]> {
    return this._http.get<IParentTask[]>(this.base_url + 'getParentTasks/');
  }

  getParent(id): Observable<IParentTask> {
    return this._http.get<IParentTask>(this.base_url + 'getParentTask/' + id);
  }

  addTask(task): Observable<ITask> {
    console.log(JSON.stringify(task));
    return this._http.post<ITask>(this.base_url + 'addtask', JSON.stringify(task), httpOptions);
  }

  getTask(id): Observable<ITask> {
    return this._http.get<ITask>(this.base_url + 'gettask/' + id);
  }

  getTaskIdbyParentNProject(thingstodotogettask): Observable<ITask> {
    console.log(thingstodotogettask)
    return this._http.get<ITask>(this.base_url + 'getTaskbytask/' + thingstodotogettask);
  }

  getTasks(id): Observable<ITask[]> {
    console.log('this is the id' + id);
    return this._http.get<ITask[]>(this.base_url + 'gettasks/' + id);
  }

  setTaskAsComplete(id): Observable<ITask> {
    return this._http.put<ITask>(this.base_url + 'completeTask/' + id, httpOptions);
  }

  editTask(task) {
    return this._http.put<ITask>(this.base_url + 'edittask/' , task, httpOptions);
  }
}
