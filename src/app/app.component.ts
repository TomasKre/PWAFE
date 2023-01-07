import { Component } from '@angular/core';
import { CookiesService } from './cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat-app';
  selectedRoomId?: string;
  loggedUsername?: string;

  constructor (private cookies: CookiesService) {
    this.cookies.setCookie('username', 'makak12', 1);
    this.loggedUsername = this.cookies.getCookie('username');
  }

  selectGroup(groupId: string) {
    this.selectedRoomId = groupId;
  }
}