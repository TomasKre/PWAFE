import { Component, Input } from '@angular/core';
import { Message } from 'model/message';
import { CHAT } from 'model/mock-chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() selectedGroupId? = '';
  @Input() loggedUserId? = '0';
  chat: Message[] = CHAT;

  constructor() { }

  ngOnInit(): void {

  }
}
