import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from 'model/room'
import { ROOMS } from 'model/mock-rooms'
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupUrl = 'https://peaceful-forest-45251.herokuapp.com/group/';

  constructor(private http: HttpClient, private cookies: CookiesService) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.groupUrl + this.cookies.getCookie('userId'))
    .pipe(
      catchError(this.handleError<Room[]>('getHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
