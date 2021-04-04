import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallComponentsService {

  constructor(private _http: HttpClient) { }

  private _root: string = 'http://localhost:8080';
  private _addContact: string = 'http://localhost:8080/addContact';
  private _getcontact: string = 'http://localhost:8080/getContact';
  private _newGroup: string = 'http://localhost:8080/newGroup';
  private _groupMessages: string = 'http://localhost:8080/groupMessages';

  showNewGroup = new EventEmitter<boolean>();
  showContacts = new EventEmitter<boolean>();
  showRooms = new EventEmitter<boolean>();
  room_Id = new EventEmitter<string>();
  room_Name = new EventEmitter<boolean>();

  user_Name:string


  callContacts(){
    return this._http.post(this._root, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
    })
  }

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
  getChatMessages(id: string){
    return this._http.post(this._groupMessages, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      chatId: id
    })

  }

  getChatid(id: string){
    this.room_Id.emit(id)
  }

}
