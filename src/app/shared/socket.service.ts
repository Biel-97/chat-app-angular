import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  socket_Client: any

  constructor() {
    this.socket_Client = io.io('http://localhost:8080/')
    }

  listen(event: string): any{
    return new Observable((subscriber) => {
      this.socket_Client.on(event, (message) => {
        subscriber.next(message)
      })
    })
  }

  emitEvent(eventName: string, message:any): void{
    this.socket_Client.emit(eventName, message)
  }


  emitPublic(eventName: string,  message:any): void{
    this.socket_Client.emit(eventName, {room:'public', message})
  }


 }
