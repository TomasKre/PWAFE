import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookiesService } from './cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat-app';
  loggedIn = false;
  selectedRoomId?: string;

  constructor (private cookies: CookiesService) {
    var token = this.cookies.getCookie('session');
    if (token != null && token != '') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.cookies.deleteCookie('session');
    window.location.reload();
  }
}