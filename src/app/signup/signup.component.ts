import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  ngOnInit() {
  }

  submit() {
    console.log(this.signup);
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
