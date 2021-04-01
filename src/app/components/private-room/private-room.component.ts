import { CallComponentsService } from './../../shared/call-components.service';
import { SocketService } from './../../shared/socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-room',
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.css']
})
export class PrivateRoomComponent implements OnInit {

  constructor(
    private _socketIO: SocketService,
    private _callComponents: CallComponentsService
    ) { }

  initialTeste =  {name: 'USER_PRIVATE', room: 'sala1'}

  ngOnInit(): void {
    this._socketIO.emitEvent('joinRoom', this.initialTeste)
    this._socketIO.listen('new message')
    .subscribe((data) => {
      console.log(data)
    })
    this._callComponents._room_Id.subscribe((id) => {
      console.log(id)
    })
  }


  getChatMessages(id: string){
    this._callComponents.getChatMessages(id).subscribe((data) => {
      console.log(data)
    })
  }
}
