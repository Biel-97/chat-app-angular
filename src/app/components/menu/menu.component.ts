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
    this._callComponents.showRooms.emit(false)
    this._callComponents.showContacts.emit(false)
    this._callComponents.showNewGroup.emit(true)
  }

  getContacts(){
    this._callComponents.showRooms.emit(false)
    this._callComponents.showNewGroup.emit(false)
    this._callComponents.showContacts.emit(true)

  }
  backToIntroPage(){
    this._router.navigate(['/'])
  }
}
