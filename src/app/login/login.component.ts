import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required, Validators.minLength(4)]);
  password = new FormControl(' ', [Validators.required, Validators.minLength(8)]);
  login = new FormGroup({
    username: this.username,
    password: this.password
  });
  validationResultUsername?: string;
  validationResultPassword?: string;

  ngOnInit() {
  }

  submit() {
    console.log(this.login);
  }
}
