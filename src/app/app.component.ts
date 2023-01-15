import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookiesService } from './cookies.service';
import { GroupService } from './group.service';
import { AddUser } from 'model/addUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat-app';
  selectedRoomId?: string;
  newGroup = new FormControl('');
  loggedIn = false;

  constructor (private groupService: GroupService, private cookies: CookiesService) {
    var token = this.cookies.getCookie('session');
    if (token != null && token != '') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  selectGroup(groupId: string) {
    this.selectedRoomId = groupId;
  }

  addToGroup() {
    console.log(this.newGroup);
    if (this.newGroup.value != null && this.selectedRoomId != null) {
      this.groupService.addToRoom(new AddUser(this.selectedRoomId, this.newGroup.value));
      this.newGroup.setValue('');
    }
  }

  logout() {
    this.cookies.deleteCookie('session');
    window.location.reload();
  }
}