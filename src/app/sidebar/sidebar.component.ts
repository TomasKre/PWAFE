import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { Room } from 'model/room'
import { CookiesService } from '../cookies.service';
import { CreateGroup } from 'model/createGroup';
import { FormControl } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  rooms: Room[] = [];
  @Output() selectedRoomId = new EventEmitter<string>();
  newGroup = new FormControl('');

  constructor(private groupService: GroupService, private cookies: CookiesService) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    var token = this.cookies.getCookie('session');
    if (token != null && token != '') {
      var tokenInfo = Object (jwt_decode(token));
      var username = tokenInfo.username;
      if (username != null) {
        this.groupService.getRooms(username).subscribe(rooms => this.rooms = rooms);
      }
    }
  }

  onSelect(groupId: string) {
    this.selectedRoomId.emit(groupId);
  }

  createGroup() {
    var token = this.cookies.getCookie('session');
    if (token != null && token != '') {
      var tokenInfo = Object (jwt_decode(token));
      var username = tokenInfo.username;
      if (this.newGroup.value != null && username != null) {
        this.groupService.createRoom(new CreateGroup(username, this.newGroup.value))
        .subscribe({
          next: data => {
            console.log(data);
            this.ngOnInit();
          },
          error: err => {
            console.log(err);
          }
        });
        this.newGroup.setValue('');
      }
    }
  }
}
