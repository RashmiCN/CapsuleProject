import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './interfaces/User';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8083/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

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


  addUser(user: IUser): Observable<IUser> {
    console.log('in user service');
    console.log(user);
    return this.http.post<IUser>( this.baseUrl + 'addUser', JSON.stringify(user), this.httpOptions)
      .pipe(
        tap((user) => console.log('added user')),
        catchError(this.handleError)
      );
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  // Get all users
  getusers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + 'user');
  }

  // Get a user
  getuser(id): Observable<IUser> {
    console.log(' in get user service' + id);
    return this.http.get<IUser>(this.baseUrl + 'getuser/' + id );

  }
  getuserByProjectId(id): Observable<IUser> {
    console.log(' in get user service' + id);
    return this.http.get<IUser>(this.baseUrl + 'getuserbyproject/' + id );

  }

  // PUT method to update user
  updateuser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl + 'edituser', JSON.stringify(user), this.httpOptions).pipe(
      tap(_ => console.log('updated')),
      catchError(this.handleError)
    );
  }

  deleteUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.baseUrl + 'deleteUser', JSON.stringify(user), this.httpOptions).pipe(
      tap(_ => console.log('deleted')),
      catchError(this.handleError)
    );
  }
}
