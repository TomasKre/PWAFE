import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookiesService } from '../cookies.service';
import { UserService } from '../user.service';
import { UserShort } from 'model/userShort';

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

  constructor(private userService: UserService, private cookies: CookiesService) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.login);
    if(this.login.value != null) {
      if(this.login.value.username != null && this.login.value.password)
      this.userService.loginUser(new UserShort(this.login.value.username, this.login.value.password))
      .subscribe({
        next: data => {
          this.cookies.setCookie("session", JSON.stringify(data), 1);
  
          this.loginFailed = false;
          this.loginSuccess = true;
          window.location.reload();
        },
        error: err => {
          this.errorMsg = err.error.message;
          this.loginFailed = true;
        }
      });
    }
  }
}
