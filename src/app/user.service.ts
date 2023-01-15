import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { User } from 'model/user';
import { UserShort } from 'model/userShort';
import { ApiResponse } from 'model/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://peaceful-forest-45251.herokuapp.com/user/';
  private httpOptions = { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  };

  constructor(private http: HttpClient, private cookies: CookiesService) { }

  signupUser(signup: User) {
    return this.http.post(this.userUrl + "signup", signup, this.httpOptions);
  }

  loginUser(login: UserShort) {
    return this.http.post(this.userUrl + "login", login, this.httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(this.userUrl + 'logout', { }, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
