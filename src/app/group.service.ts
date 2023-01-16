import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from 'model/room'
import { CookiesService } from './cookies.service';
import { AddUser } from 'model/addUser';
import { CreateGroup } from 'model/createGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  //private groupUrl = 'https://peaceful-forest-45251.herokuapp.com/group';
  private groupUrl = 'http://localhost:5000/group';
  private httpOptions;


  constructor(private http: HttpClient, private cookies: CookiesService) {
    var token = cookies.getCookie('session');
    this.httpOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Session': token
    })};
  }

  getRooms(username: string): Observable<Room[]> {
    return this.http.get<Room[]>(this.groupUrl + "/" + username, this.httpOptions)
    .pipe(
      catchError(this.handleError<Room[]>('getRooms', []))
    );
  }

  addToRoom(addUser: AddUser) {
    return this.http.post(this.groupUrl + "/addUser", addUser, this.httpOptions);
  }

  createRoom(creategroup: CreateGroup) {
    return this.http.post(this.groupUrl, creategroup, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
