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
  GroupOrChat: boolean;
  _userInfo: any = { User_ID: localStorage.getItem('User_id') };
  myid: string = this._userInfo.User_ID;
  groupParticipants: object[]

  ngOnInit(): void {
    this.getGroupMessages(this._callComponents.startRoomId)

      this._callComponents.room_Id.subscribe((room_ID) => {
        this.groupParticipants = []
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
      if (this._userInfo.roomName != data['id']) {
        this._socketIO.emitEvent('exitRoom', this._userInfo);
        this._socketIO.emitEvent('joinRoom', this._userInfo);
        this._userInfo.roomName = data['id'];
      }
    });
  }

  getGroupMessages(id: any) {
    this._callComponents.getGroupMessages(id).subscribe((data: any) => {
      this._userInfo.groupDescription = data.description;
      this._userInfo.room_ID = id;
      console.log(this._userInfo);
      this.chatMessages = data.messages;
      document.querySelector(
        '.MessagesList'
      ).scrollTop = document.querySelector('.MessagesList').scrollHeight;
      this.GroupOrChat = !!data.description;
    });
  }
  sendMessage(event: any, message: any) {
    event.preventDefault();
    if (message.value.trim() !== '') {
      this._userInfo.UserName = this._callComponents.user_Name;

      this._userInfo.message = message.value;
      this._socketIO.emitEvent('new message', this._userInfo);
      message.value = '';
      document.querySelector(
        '.MessagesList'
      ).scrollTop = document.querySelector('.MessagesList').scrollHeight;
    } else {
      message.value = '';
    }
  }

  whoSendedMessage(message: any) {
    if (message.id == localStorage.getItem('User_id')) {
      this.whoSended = true;
    } else {
      this.whoSended = false;
    }
  }

  exitChat() {
    this._callComponents.exitPage.emit(false);
    this._router.navigate(['/lobby']);
    // document.location.reload()
  }
  getGroupParticipants() {
    this._callComponents.getGroupParticipants(this._userInfo.room_ID).subscribe((data: object[]) => {
      console.log(data)
      this.groupParticipants = data
    })
  }

  leaveGroup() {
    this._callComponents.LeaveGroup(this._userInfo.room_ID).subscribe((data :any) => {
      if(data.ok){
        this._router.navigate(['/lobby'])
        document.location.reload();
      }
    })
  }
  deleteContact() {
    this._callComponents
      .deleteContact(this._userInfo.room_ID)
      .subscribe((data: any) => {
        console.log(data);
        if (data.ok) {
          this.exitChat();
        }
      });
  }
}
