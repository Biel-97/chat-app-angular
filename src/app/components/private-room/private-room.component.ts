import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CallComponentsService } from './../../shared/call-components.service';
import { SocketService } from './../../shared/socket.service';
import { AuthenticateService } from 'src/app/shared/authenticate.service';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.css'],
})
export class PrivateRoomComponent implements OnInit {
  constructor(
    private _socketIO: SocketService,
    private _callComponents: CallComponentsService,
    private _auth: AuthenticateService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  chatMessages = [];
  whoSended: boolean;
  groupDescription: string

   _userInfo: any = { User_ID: localStorage.getItem('User_id') };
  myid: string = this._userInfo.User_ID;

  ngOnInit(): void {

    this._callComponents.room_Id.subscribe((room_ID) => {
      this.getGroupMessages(room_ID);
      this._userInfo.room_ID = room_ID;
    });
    this._socketIO.listen('new message').subscribe((data: any) => {
      this.chatMessages.push(data);
      if (data.User_ID == localStorage.getItem('User_id')) {
        this.whoSended = true;
      } else {
        this.whoSended = false;
      }
    });

    this._route.params.subscribe((data: any) => {

      if(this._userInfo.roomName != data['id']){
        this._socketIO.emitEvent('exitRoom', this._userInfo);
        this._socketIO.emitEvent('joinRoom', this._userInfo);

        this._userInfo.roomName = data['id'];
      }
    });

  }


  getGroupMessages(id: string) {
    this._callComponents.getGroupMessages(id).subscribe((data: any) => {
      this.groupDescription = data.description
      this.chatMessages = data.messages;
      document.querySelector('.MessagesList').scrollTop = document.querySelector('.MessagesList').scrollHeight
    });
  }
  sendMessage(event: any, message: any) {
    event.preventDefault();
    if (message.value !== '') {
      this._userInfo.UserName = this._callComponents.user_Name;

      this._userInfo.message = message.value;
      this._socketIO.emitEvent('new message', this._userInfo);
      message.value = '';
      document.querySelector('.MessagesList').scrollTop = document.querySelector('.MessagesList').scrollHeight

    }
  }

  whoSendedMessage(message: any) {
    if (message.id == localStorage.getItem('User_id')) {
      this.whoSended = true;
    } else {
      this.whoSended = false;
    }
  }
}
