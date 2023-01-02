import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Room } from 'model/room'
import { ROOMS } from 'model/mock-rooms'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  rooms = ROOMS;
  @Output() selectedRoomId = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  onSelect(groupId: string) {
    this.selectedRoomId.emit(groupId);
  }
}
