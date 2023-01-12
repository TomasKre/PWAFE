import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'model/message';
import { CookiesService } from '../cookies.service';
import { MessageService } from '../message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() selectedGroupId? = '';
  loggedUsername: string;
  newMessage = new FormControl('');
  chat: Message[] = [];

  constructor(private messageService: MessageService, private cookies: CookiesService) {
    this.loggedUsername = this.cookies.getCookie('username');
  }

  ngOnInit(){
    this.messageService.listenForNewMessage().subscribe((message: Message) => {
      this.chat.push(message);
    })
  }

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

  sendMessage() {
    console.log(this.newMessage);
    if (this.newMessage.value != null) {
      this.messageService.sendMessage(this.newMessage.value);
      this.newMessage.setValue('');
    }
  }
}