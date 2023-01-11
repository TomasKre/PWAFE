import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = new FormControl('', [Validators.required, Validators.minLength(4)]);
  email = new FormControl(' ', [Validators.required, Validators.email]);
  password = new FormControl(' ', [Validators.required, Validators.minLength(8)]);
  firstName = new FormControl(' ', [Validators.required, Validators.minLength(2)]);
  lastName = new FormControl(' ', [Validators.required, Validators.minLength(2)]);
  signup = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName
  });
  validationResultUsername?: string;
  validationResultPassword?: string;
  validationResultEmail?: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.signup);
    if(this.signup.value != null)
      if(this.signup.value.username != null && this.signup.value.password != null && 
        this.signup.value.email != null && this.signup.value.firstName != null && this.signup.value.lastName != null)
      this.userService.signupUser(new User(this.signup.value.username, this.signup.value.password,
        this.signup.value.email, this.signup.value.firstName, this.signup.value.lastName));
  }

  validationUsername() {
    if (this.username.value != null && this.username.value.length >= 4) {
      this.validationResultUsername = "✓";
    } else
      this.validationResultUsername = "Přezdívka je moc krátká";
  }

  validationPassword() {
    if (this.password.value != null && this.password.value.length >= 8) {
      if (/[A-Z]/.test(this.password.value)) {
        if (/[a-z]/.test(this.password.value)) {
          if (/[0-9]/.test(this.password.value)) {
            this.validationResultPassword = "✓";
          } else
          this.validationResultPassword = "Heslo neobsahuje číslo";
        } else
        this.validationResultPassword = "Heslo neobsahuje malé znaky";
      } else
      this.validationResultPassword = "Heslo neobsahuje velké znaky";
    } else
      this.validationResultPassword = "Heslo je moc krátké";  
  }

  validationEmail() {
    if (this.email.value != null && this.email.value.length >= 3) {
      if(this.email.value.includes('@')) {
        if(/[a-zA-Z0-9]@[a-zA-Z0-9]/.test(this.email.value)) {
          this.validationResultEmail = "✓";
        } else
        this.validationResultEmail = "Email není platný";
      } else
      this.validationResultEmail = "Email neobsahuje @";
    } else
      this.validationResultEmail = "Email je moc krátký";
  }
}
