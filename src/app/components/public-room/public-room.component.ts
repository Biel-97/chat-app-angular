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

  initialTeste:any =  { roomName: 'public'}

  ngOnInit(): void {
    this._socketIO.listen('new message').subscribe((data) => {
      console.log(data)
      this.initialTeste.name = data.UserName
      this.msgs.push(data)
    })

    this._socketIO.emitEvent('joinRoom', this.initialTeste)

    this._auth.authenticate().subscribe((data: any) => {
      this.initialTeste.UserName = data.name
    })

  }

  sendMessage(event:any, message:any){
    event.preventDefault()
    if(message.value !==''){
      this.initialTeste.message = message.value
      this._socketIO.emitEvent('new message', this.initialTeste)
      message.value =''
    }else{
      console.log('Message is empty')
    }
  }

}
