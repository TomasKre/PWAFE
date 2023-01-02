import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../group.service';
import { Room } from 'model/room'
import { ROOMS } from 'model/mock-rooms'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  rooms: Room[] = [];
  @Output() selectedRoomId = new EventEmitter<string>();

  constructor(private groupService: GroupService) { }

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
