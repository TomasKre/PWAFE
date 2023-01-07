import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { Message } from 'model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageUrl = 'https://peaceful-forest-45251.herokuapp.com/message/';

  constructor(private http: HttpClient, private cookies: CookiesService) { }

  getMessages(groupId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.messageUrl + groupId,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    })
    .pipe(
      catchError(this.handleError<Message[]>('getMessages', []))
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
