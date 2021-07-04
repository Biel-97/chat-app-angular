import { SocketService } from './../../shared/socket.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';

@Component({
  selector: 'app-public-room',
  templateUrl: './public-room.component.html',
  styleUrls: ['./public-room.component.css']
})
export class PublicRoomComponent implements OnInit {

  constructor(
    private _socketIO: SocketService,
    private _auth: AuthenticateService
  ) {}

  msgs=[]
  userInfo:any =  { roomName: 'public'}

  ngOnInit(): void {
    this._socketIO.listen('new message').subscribe((data) => {
      this.msgs.push(data)
      document.querySelector(
        '.Messages'
      ).scrollTop = document.querySelector('.Messages').scrollHeight;
    })

    this._socketIO.emitEvent('joinRoom', this.userInfo)

    this._auth.authenticate().subscribe((data: any) => {
      this.userInfo.UserName = data.name
      this.userInfo.email = data.email
      this.userInfo.id = data._id
    })

  }

  sendMessage(event:any, message:any){
    event.preventDefault()
    if(message.value.trim() !==''){
      this.userInfo.message = message.value
      this._socketIO.emitEvent('new message', this.userInfo)
      message.value =''
    }else{
      console.log('Message is empty')
      message.value =''
    }
  }

}
