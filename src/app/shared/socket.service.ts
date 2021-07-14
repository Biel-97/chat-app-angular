import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'
import {BACK_END_URL} from '../../../env.js'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  socket_Client: any

  constructor() {
    let _BackEndRoot = BACK_END_URL
    this.socket_Client = io.io(_BackEndRoot)
    }

  listen(event: string): any{
    return new Observable((subscriber) => {
      this.socket_Client.on(event, (message) => {
        subscriber.next(message)
      })
    })
  }

  emitEvent(eventName: string, data:any): void{
    this.socket_Client.emit(eventName, data)
  }


  emitPublic(eventName: string,  data:any): void{
    this.socket_Client.emit(eventName, {room:'public', data})
  }


 }
