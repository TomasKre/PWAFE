import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'model/message';
import { CookiesService } from '../cookies.service';
import { MessageService } from '../message.service';
import { FormControl } from '@angular/forms';
import { AddUser } from 'model/addUser';
import { GroupService } from '../group.service';
import { MessageClass } from 'model/messageClass';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() selectedGroupId? = '';
  loggedUsername?: string;
  newUser = new FormControl('');
  newMessage = new FormControl('');
  chat: Message[] = [];

  constructor(private messageService: MessageService, private groupService: GroupService,
    private cookies: CookiesService) {
      var token = this.cookies.getCookie('session');
      if (token != null && token != '') {
        var tokenInfo = Object (jwt_decode(token));
        this.loggedUsername = tokenInfo.username;
      }
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
    if (this.newMessage.value != null) {
      if (this.loggedUsername != null && this.selectedGroupId != null && this.selectedGroupId != '') {
        var message = new MessageClass(this.selectedGroupId, this.loggedUsername, this.newMessage.value, new Date());
        this.messageService.sendMessage(message);
      }
      this.newMessage.setValue('');
    }
  }

  addToGroup() {
    console.log(this.newUser);
    if (this.newUser.value != null && this.selectedGroupId != '' && this.selectedGroupId != null) {
      this.groupService.addToRoom(new AddUser(this.newUser.value, this.selectedGroupId))
      .subscribe({
        next: data => {
          console.log(data);
          window.location.reload(); // TODO: vylepšit aby se neaktualizovalo celé
        },
        error: err => {
          console.log(err);
        }
      });
      this.newUser.setValue('');
    }
  }
}