import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from './interfaces/Project';
import { ITask } from './interfaces/Task';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:8083/';

  constructor(private _http: HttpClient) { }

  addProject(project): Observable<IProject> {
    return this._http.post<IProject>(this.baseUrl + 'addproject', project, httpOptions);
  }

  updateProject(project, id): Observable<IProject> {
    return this._http.put<IProject>(this.baseUrl + `editproject/${id}`, project, httpOptions);
  }

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this.baseUrl + 'projects');
  }

  deleteProject(id): Observable<IProject> {
    return this._http.delete<IProject>(this.baseUrl + 'deleteproject/' + id);
  }

  getProject(id): Observable<IProject> {
    return this._http.get<IProject>(this.baseUrl + 'getproject/' + id);
  }

  getCompletedTasks(id): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'getcompleted/' + id);
  }

  getTotalTasks(id): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'getProjectTasks/' + id);
  }
}
