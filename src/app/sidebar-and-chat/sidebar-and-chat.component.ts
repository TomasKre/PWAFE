import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from '../cookies.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-sidebar-and-chat',
  templateUrl: './sidebar-and-chat.component.html',
  styleUrls: ['./sidebar-and-chat.component.css']
})
export class SidebarAndChatComponent {
  
  @Output() selectedGroupId? = new EventEmitter<string>();
  @Input()  selectedRoomId?: string; 

  constructor (private messageService: MessageService, private cookies: CookiesService,
    private router: Router) {
    var token = this.cookies.getCookie('session');
    if (token == null || token == '') {
      this.router.navigate(['/login']);
    }
  }

  selectGroup(groupId: string) {
    this.selectedRoomId = groupId;
  }
}
