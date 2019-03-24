import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IProject } from './interfaces/Project';
import { ITask } from './interfaces/Task';
import { tap, catchError } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:8083/';

  constructor(private _http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    // console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened;' + error.error.message + ' please try again later.');
  }

  addProject(project): Observable<IProject> {
    return this._http.post<IProject>(this.baseUrl + 'addproject', project, httpOptions);
  }

  updateProject(project): Observable<IProject> {
    return this._http.put<IProject>(this.baseUrl + 'editproject', project, httpOptions);
  }

  getProjects(): Observable<IProject[]> {
    return this._http.get<IProject[]>(this.baseUrl + 'projects');
  }

  deleteProject(project: IProject): Observable<IProject> {
    console.log('ok control comes here we are on path');
    return this._http.put<IProject>(this.baseUrl + 'deleteproject', project, httpOptions)
  }

  getProject(id): Observable<IProject> {
    return this._http.get<IProject>(this.baseUrl + 'getproject/' + id);
  }

  getProjectByPName(name): Observable<IProject> {
    return this._http.get<IProject>(this.baseUrl + 'getprojectByPName/' + name);
  }
  getCompletedTasks(id): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'getcompleted/' + id);
  }

  getTotalTasks(id): Observable<any> {
    return this._http.get<any>(this.baseUrl + 'getProjectTasks/' + id);
  }
}
