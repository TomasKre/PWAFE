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
  loggedUserId?: string;

  constructor (private cookies: CookiesService) {
    this.cookies.setCookie('userId', '639f92127a41c06074b35dea', 1);
    this.loggedUserId = this.cookies.getCookie('userId');
  }

  selectGroup(groupId: string) {
    this.selectedRoomId = groupId;
  }
}