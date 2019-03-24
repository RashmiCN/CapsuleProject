import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './interfaces/Task';
import { IParentTask } from './interfaces/ParentTask';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseURL = 'http://localhost:8083/';

  constructor(private _http: HttpClient) { }

  addParent(parent): Observable<string> {
    return this._http.post<string>(this.baseURL + 'addParentTask/' + parent, httpOptions);
  }

  getParents(): Observable<IParentTask[]> {
    return this._http.get<IParentTask[]>(this.baseURL + 'getParentTasks/');
  }

  getParent(id): Observable<IParentTask> {
    return this._http.get<IParentTask>(this.baseURL + 'getParentTask/' + id);
  }

  addTask(task): Observable<ITask> {
    console.log(JSON.stringify(task));
    return this._http.post<ITask>(this.baseURL + 'addtask', JSON.stringify(task), httpOptions);
  }

  getTask(id): Observable<ITask> {
    return this._http.get<ITask>(this.baseURL + 'gettask/' + id);
  }

  getTaskIdbyParentNProject(thingstodotogettask): Observable<ITask> {
    console.log(thingstodotogettask)
    return this._http.get<ITask>(this.baseURL + 'getTaskbytask/' + thingstodotogettask);
  }

  getTasks(id): Observable<ITask[]> {
    console.log('this is the id' + id);
    return this._http.get<ITask[]>(this.baseURL + 'gettasks/' + id);
  }

  setTaskAsComplete(id): Observable<ITask> {
    return this._http.put<ITask>(this.baseURL + 'completeTask/' + id, httpOptions);
  }

  editTask(task) {
    return this._http.put<ITask>(this.baseURL + 'edittask/' , task, httpOptions);
  }
}
