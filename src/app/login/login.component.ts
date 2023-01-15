import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from '../cookies.service';
import { UserService } from '../user.service';
import { UserShort } from 'model/userShort';
import { LoginResponse } from 'model/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required, Validators.minLength(4)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  login = new FormGroup({
    username: this.username,
    password: this.password
  });
  validationResultUsername?: string;
  validationResultPassword?: string;
  loginFailed = false;
  loginSuccess = false;
  errorMsg = '';

  constructor(private userService: UserService, private cookies: CookiesService, private router: Router) {
    var token = this.cookies.getCookie('session');
    if (token != null && token != '') {
      this.router.navigate(['/chat']);
    }
  }

  ngOnInit() {
  }

  submit() {
    if(this.login.value != null) {
      if(this.login.value.username != null && this.login.value.password)
      this.userService.loginUser(new UserShort(this.login.value.username, this.login.value.password))
      .subscribe({
        next: data => {
          var loginResponse = data as LoginResponse;
          this.cookies.setCookie("session", loginResponse.token, 1);
  
          this.loginFailed = false;
          this.loginSuccess = true;
          this.router.navigate(['/chat']);
        },
        error: err => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.loginFailed = true;
        }
      });
    }
  }
}
