import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-and-chat',
  templateUrl: './sidebar-and-chat.component.html',
  styleUrls: ['./sidebar-and-chat.component.css']
})
export class SidebarAndChatComponent {
  selectedRoomId?: string;

  selectGroup(groupId: string) {
    this.selectedRoomId = groupId;
  }
}
