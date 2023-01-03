import { Component, Input } from '@angular/core';
import { Message } from 'model/message';
import { CHAT } from 'model/mock-chat';
import { CookiesService } from '../cookies.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() selectedGroupId? = '';
  loggedUserId: string;
  chat: Message[] = CHAT;

  constructor(private cookies: CookiesService) {
    this.loggedUserId = this.cookies.getCookie('userId');
  }

  ngOnInit(): void {

  }
}
