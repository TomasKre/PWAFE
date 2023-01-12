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
  private messageUrl = 'https://peaceful-forest-45251.herokuapp.com/message/';
  public socket: any; //je potřeba port, ale ten
  //se s každým rekompilem mění

  constructor(private http: HttpClient, private cookies: CookiesService) { }

  ngOnInit(){
    this.http.get<string>('https:peaceful-forest-45251.herokuapp.com',
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    }).pipe(
      catchError(this.handleError<string>('getPort'))
    ).subscribe(result => {
      this.socket = io('https://peaceful-forest-45251.herokuapp.com:' + result);
      console.log(result);
    });
  }

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

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public listenForNewMessage = () => {
    this.socket.on('message', (message: Message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

}
