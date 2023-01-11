import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { User } from 'model/user';
import { UserShort } from 'model/userShort';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private messageUrl = 'https://peaceful-forest-45251.herokuapp.com/user/';

  constructor(private http: HttpClient, private cookies: CookiesService) { }

  signupUser(signup: User) {

  }

  loginUser(login: UserShort) {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
