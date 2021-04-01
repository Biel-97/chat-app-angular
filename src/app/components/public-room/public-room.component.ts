import { SocketService } from './../../shared/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-room',
  templateUrl: './public-room.component.html',
  styleUrls: ['./public-room.component.css']
})
export class PublicRoomComponent implements OnInit {

  constructor(
    private _socketIO: SocketService
  ) {}

  msgs=[]

  initialTeste =  {name: 'Nome Generico', room: 'public'}
  ngOnInit(): void {
    this._socketIO.listen('new message').subscribe((data) => {
      console.log(data)
      this.msgs.push(data)
    })

    this._socketIO.emitEvent('joinRoom', this.initialTeste)

  }

  sendMessage(event:any, message:any){
    event.preventDefault()


    if(message.value !==''){
      this._socketIO.emitPublic('new message' ,message.value)

    }else{
      console.log('Message is empty')
    }
  }

}
