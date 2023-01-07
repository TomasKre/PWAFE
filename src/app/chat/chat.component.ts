import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'model/message';
import { CHAT } from 'model/mock-chat';
import { CookiesService } from '../cookies.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() selectedGroupId? = '';
  loggedUsername: string;
  chat: Message[] = [];

  constructor(private messageService: MessageService, private cookies: CookiesService) {
    this.loggedUsername = this.cookies.getCookie('username');
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedGroupId']) {
      this.getMessages();
    }
  }

  getMessages(): void {
    if (this.selectedGroupId != null) {
      this.messageService.getMessages(this.selectedGroupId).subscribe(chat => this.chat = chat);
    }
  }
}