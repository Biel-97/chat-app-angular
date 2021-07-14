import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {BACK_END_URL} from '../../../env.js'

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService implements OnInit {
  UserStatus: boolean;
  _BackEndRoot: string = BACK_END_URL

  authRoom: string = this._BackEndRoot+ '/group/authRoom';

  showHeaderEmitter = new EventEmitter<boolean>();

  constructor(
    private _router: Router,
    private _http: HttpClient) {}

  // params = {
  //   token: `Bearer ${localStorage.token}`,
  //   id: localStorage.User_id,
  // };

  ngOnInit() {
  }

  Register(value: object) {
    return this._http.post(this._BackEndRoot +'/auth/register', value)
  }

  Login(value: object) {
    return this._http.post(this._BackEndRoot + '/auth/login', value)
  }

  loggedIn(){
    if(!!localStorage.getItem('token')){
      this.showHeaderEmitter.emit(true);
    }else{
      this.showHeaderEmitter.emit(false);
    }
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  authenticate() {
    return this._http.post(this._BackEndRoot, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
    })
  }
  authenticateRoom(roomId:string) {
    return this._http.post(this.authRoom, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
      roomid: roomId
    })
  }



}
