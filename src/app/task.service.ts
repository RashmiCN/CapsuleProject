import { Injectable } from '@angular/core';
import { ITask } from 'src/app/interfaces/Task';
import { Observable , throwError } from 'rxjs';
import { catchError , retry , map, tap} from 'rxjs/operators';
import {  HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from 'util';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  endpoint = 'http://localhost:8083/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


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

  // POST method to add task
  addTask(task: ITask): Observable<ITask> {
    // console.log('in service');
    // console.log(task);
    return this.http.post<ITask>('http://localhost:8083/addtask' ,JSON.stringify(task), this.httpOptions)
      .pipe(
        tap((task) => console.log("added task")),
        catchError(this.handleError)
      );
  }

  // POST to add Parent
  addParentTask(parentTaskName:string): Observable<string> {
    console.log('in service');
    console.log(parentTaskName);
    return this.http.post<string>('http://localhost:8083/addParentTask', JSON.stringify(parentTaskName), this.httpOptions)
      .pipe(
        tap((task) => console.log("added Parent task")),
        catchError(this.handleError)
      );
  }

  // Get all tasks
  getTasks(): Observable<any> {
    return this.http.get('/task').pipe(
      map(this.extractData));

  }

  // Get a Task
  getTask(task: ITask): Observable<any> {
    return this.http.get('/gettask').pipe(
      map(this.extractData));

  }

  // PUT method to update Task
  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>('http://localhost:8083/edittask', JSON.stringify(task), this.httpOptions).pipe(
      tap(_ => console.log('updated')),
      catchError(this.handleError)
    );
  }

  // Flip Process 
  updateFlipTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>('http://localhost:8083/editFliptask', JSON.stringify(task), this.httpOptions).pipe(
      tap(_ => console.log('updated')),
      catchError(this.handleError)
    );
  }
}
