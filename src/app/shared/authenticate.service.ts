import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import User from '../User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService implements OnInit {
  UserStatus: boolean;
  root: string = 'http://localhost:8080';

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
    return this._http.post(this.root +'/auth/register', value)
  }

  Login(value: object) {
    return this._http.post(this.root + '/auth/login', value)
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
    return this._http.post(this.root, {
      token: `Bearer ${localStorage.token}`,
      id: localStorage.User_id,
    })
  }



}
