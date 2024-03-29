import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { Message } from 'model/message';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message$: BehaviorSubject<Message> = new BehaviorSubject<Message>(<Message>({}));
  private serverUrl = 'https://peaceful-forest-45251.herokuapp.com';
  private messageUrl = this.serverUrl + '/message/';
  //private messageUrl = 'http://localhost:5000/message/';

  public socket: any; // port bude získáván z dotazu na cestu "/"
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
    /*this.http.get<string>('https:peaceful-forest-45251.herokuapp.com', this.httpOptions)
    .pipe(
      catchError(this.handleError<string>('getPort'))
    ).subscribe(result => {*/
      this.socket = io(this.serverUrl/* + ':' + result*/);
    /*  console.log(this.socket);
    });*/
    //this.socket = io('http://localhost:5000');
   }

  getMessages(groupId: string): Observable<Message[]> {
    return this.http.get<Message[]>(this.messageUrl + groupId, this.httpOptions)
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

  public sendMessage(message: Message) {
    console.log(message);
    this.socket.emit('message', message);
  }

  public listenForNewMessage = () => {
    this.socket.on('message', (message: Message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

}
