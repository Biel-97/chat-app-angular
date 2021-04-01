import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private _router: Router,
    private _callComponents: CallComponentsService
  ) { }

  ngOnInit(): void { }


  createNewGroup(){
    this._callComponents._showRooms.emit(false)
    this._callComponents._showContacts.emit(false)
    this._callComponents._showNewGroup.emit(true)
  }

  getContacts(){
    this._callComponents._showRooms.emit(false)
    this._callComponents._showNewGroup.emit(false)
    this._callComponents._showContacts.emit(true)

  }
}
