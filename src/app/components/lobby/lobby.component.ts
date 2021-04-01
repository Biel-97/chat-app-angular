import { MatDialog } from '@angular/material/dialog';
import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { NewContactComponent } from '../new-contact/new-contact.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit {
  rooms: object[] ;
  contactsList: object[]

  newgroup: boolean = false;
  contacts: boolean = false;
  getrooms: boolean = true;

  constructor(
    private _auth: AuthenticateService,
    private _callComponents: CallComponentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._auth.showHeaderEmitter.emit(false);
    }, 0);

    this._callComponents._showNewGroup.subscribe((show) => {
      this.newgroup = show;
    });
    this._callComponents._showContacts.subscribe((show) => {
      this.contacts = show;

    });
    this._callComponents._showRooms.subscribe((show) => {
      this.getrooms = show;
    });
    this._callComponents.getContacts().subscribe((data: any) => {
      this.contactsList = data.User.contacts
    })
    this.getUserChats()
  }

  openDialogForm(): void {
    const dialogRef = this.dialog.open(NewContactComponent, {
      width: '500px'
    });
  }
  cancelNewGroup(){
    this._callComponents._showRooms.emit(true)
    this._callComponents._showContacts.emit(false)
    this._callComponents._showNewGroup.emit(false)
  }

  getUserChats(){
    this._auth.authenticate().subscribe((data: any) => {
      this.rooms = data.Rooms
    })
  }

  getChatMessages(id: string){

    this._callComponents._room_Id.emit(id)
  }
}
