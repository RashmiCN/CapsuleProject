import { Injectable } from '@angular/core';
import { ITask } from 'src/app/add-task/Task';
import { Observable , throwError } from 'rxjs';
import { catchError , retry , map, tap} from 'rxjs/operators';
import {  HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  endpoint = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse) {
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
      'Something bad happened; please try again later.');
  };
  addTask(task: ITask): Observable<ITask> {
    console.log('in service');
    console.log(task);
    return this.http.post<ITask>('http://localhost:8081/TaskTrackerRest/addtask' ,JSON.stringify(task), this.httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }
  getTasks(): Observable<any> {
    return this.http.get('http://localhost:8081/TaskTrackerRest/task').pipe(
      map(this.extractData));

  }
  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>('http://localhost:3000/' + 'products/', JSON.stringify(task), this.httpOptions).pipe(
      // tap(_ => console.log('updated')),
      catchError(this.handleError)
    );
  }
}
