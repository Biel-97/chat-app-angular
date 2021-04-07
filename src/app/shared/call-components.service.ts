import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallComponentsService {

  constructor(private _http: HttpClient) { }

  private readonly _root: string = 'http://localhost:8080';
  private readonly _addContact: string = 'http://localhost:8080/addContact';
  private readonly _getcontact: string = 'http://localhost:8080/getContact';
  private readonly _newGroup: string = 'http://localhost:8080/newGroup';
  private readonly _groupMessages: string = 'http://localhost:8080/groupMessages';
  private readonly _newPrivateChat: string = 'http://localhost:8080/private/newPrivateChat';
  private readonly _getPrivateChat: string = 'http://localhost:8080/private/getPrivateChat';

  showNewGroup = new EventEmitter<boolean>();
  showContacts = new EventEmitter<boolean>();
  showRooms = new EventEmitter<boolean>();
  room_Id = new EventEmitter<string>();
  room_Name = new EventEmitter<boolean>();
  newContact= new EventEmitter<boolean>()
  user_Name:string
  user_Email:string


  addContacts( email:string){
    return this._http.post(this._addContact, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      email
    })
  }

  getContacts(){

    return this._http.post(this._getcontact, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
    })

  }

  addNewGroup(room: any){
    return this._http.post(this._newGroup, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      room
    })
  }
  getGroupMessages(id: string){
    return this._http.post(this._groupMessages, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      chatId: id
    })

  }

  getGroupId(id: string){
    this.room_Id.emit(id)
  }

  addNewPrivateChat(contactId: any){
    return this._http.post(this._newPrivateChat, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      contactId,
      email: this.user_Email,
      name: this.user_Name

    })
  }

  getPrivateChats(chatId:any){

    return this._http.post(this._getPrivateChat, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      chatId
    })
  }

}
