import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { Room } from 'model/room'
import { ROOMS } from 'model/mock-rooms'
import { CookiesService } from '../cookies.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  rooms: Room[] = [];
  @Input() 
  @Output() selectedRoomId = new EventEmitter<string>();

  constructor(private groupService: GroupService, private cookies: CookiesService) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups(): void {
    this.groupService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  onSelect(groupId: string) {
    this.selectedRoomId.emit(groupId);
  }
}
