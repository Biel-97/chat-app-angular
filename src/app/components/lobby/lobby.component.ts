import { DialogDeleteContactComponent } from './../dialog/dialog-delete-contact/dialog-delete-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { NewContactComponent } from '../dialog/new-contact/new-contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  rooms: object[];
  contactsList: object[];

  newgroup: boolean = false;
  contacts: boolean = false;
  getChats: boolean = true;
  exitPage: boolean = false;
  addContactGroup: boolean = false
  renderGroupInfo: boolean = false;
  groupInfo: any
  addContactStatus: string
  userStatus: string
  privateChats: [];
  groupInfoInicio: any ={}
  currentGroup:string
  constructor(
    private _auth: AuthenticateService,
    private _callComponents: CallComponentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._callComponents.renderGroupInfo.subscribe(data => {
      this.renderGroupInfo = data
    })
    setTimeout(() => {
      this._auth.showHeaderEmitter.emit(false);
    }, 0);

    this._callComponents.showNewGroup.subscribe((show) => {
      this.newgroup = show;
    });
    this._callComponents.showContacts.subscribe((show) => {
      this.contacts = show;
      if (show) {
        this._callComponents.getContacts().subscribe((data: any) => {
          this.contactsList = data.User.contacts;
          console.log(data);
        });
      }
    });
    this._callComponents.showRooms.subscribe((show) => {
      this.getUserChats();
      this.getChats = show;
    });
    this._callComponents.newContact.subscribe((data) => {
      this._callComponents.getContacts().subscribe((data: any) => {
        this.contactsList = data.User.contacts;
      });
    });
    this._callComponents.exitPage.subscribe((data) => {
      this.exitPage = data;
      if (data == false) {
        this._callComponents.getContacts().subscribe((data: any) => {
          this.contactsList = data.User.contacts;
        });
      }
      this._callComponents.addContactGroup.subscribe((data) => {
        this.addContactGroup = data
      })

    });

    this.getUserChats();
    this._callComponents.getGroupParticipantsList.subscribe((GroupId) => {
      this._callComponents.getGroupParticipants(GroupId).subscribe((data: any) => {

        this.groupInfo = data
        this.groupInfoInicio.groupDesc = data.description+ ''
        this.groupInfoInicio.GroupId = GroupId+ ''
        this.newgroup = false;
        this.contacts = false;
        this.getChats = false;
        this._callComponents.renderGroupInfo.emit(true)
        data.participants.forEach(element => {
          if(element.email == this._callComponents.user_Email){
            this.userStatus = element.status
          }
        });
      })
    })
  }

  openDialogForm(): void {
    const dialogRef = this.dialog.open(NewContactComponent, {
      width: '500px',
    });
  }
  cancelNewGroup() {
    this._callComponents.showRooms.emit(true);
    this._callComponents.showContacts.emit(false);
    this._callComponents.addContactGroup.emit(false);
    this._callComponents.showNewGroup.emit(false);

    this._callComponents.renderGroupInfo.emit(false)
  }

  getUserChats() {
    this._auth.authenticate().subscribe((data: any) => {
      console.log(data.Rooms)
      if (data.error) {
        localStorage.clear();
      } else {
        this.privateChats = data.privateChatIds;
        this.rooms = data.Rooms;
        this._callComponents.user_Name = data.name;
        this._callComponents.user_Email = data.email;
      }
    });
  }

  getGroupId(id: string) {
    this._callComponents.startRoomId = id;

    this._callComponents.room_Id.emit(id);
    this._callComponents.exitPage.emit(true);
    this.currentGroup = id
  }

  createPrivateChat(contactID) {
    this._callComponents.addNewPrivateChat(contactID).subscribe((data: any) => {
      this.getGroupId(data.chatId);
    });
  }
  deleteContact(contactID) {
    this._callComponents.deleteContact(contactID).subscribe((data: any) => {
      if (data.ok) {
        document.location.reload();
      }
    });
  }
  openDialogDeletContact(contactid) {
    this._callComponents.startRoomId = contactid
    const dialogRef = this.dialog.open(DialogDeleteContactComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  addContact(email){
    console.log(email)
    this._callComponents.addContacts(email).subscribe((data: any) => {
      if(data.error){
        console.log(data)
        alert(data.error)
        this.addContactStatus = data.error
      }else{
        this._callComponents.newContact.emit(true)
        this.addContactStatus = data.ok
        alert(data.ok)
      }
    })
  }
  removefromgroup(person){
    const contactEmail = person.email
    this._callComponents.removefromgroup(this.currentGroup, contactEmail).subscribe((data:any) => {
      if(data.error){
        alert(data.error)
      }else{
        this._callComponents.getGroupParticipantsList.emit(this.currentGroup)
      }
    });
  }
  InviteToGroup(contactId){

    if(this.userStatus == 'administrator'){
      this._callComponents.AddIngroup(this.currentGroup, contactId).subscribe((data:any) => {
        console.log(data)
        if(data.error){
          alert(data.error)
        }else{
          this._callComponents.getGroupParticipantsList.emit(this.currentGroup)
          this.addParticipants(false)
        }
      })
    }else{
      alert('Only administrators can add new participants to the group.')
    }
  }
  addParticipants(status: boolean){
    console.log(this.groupInfo.description == '')
    if(status){
      this._callComponents.showRooms.emit(false);
      this._callComponents.showNewGroup.emit(false);
      this._callComponents.showContacts.emit(true);
      this._callComponents.addContactGroup.emit(true)
      this._callComponents.renderGroupInfo.emit(false)
    }else{
      this._callComponents.showRooms.emit(false);
      this._callComponents.showNewGroup.emit(false);
      this._callComponents.showContacts.emit(false);
      this._callComponents.addContactGroup.emit(true)
      this._callComponents.renderGroupInfo.emit(true)
    }
  }
  concedAdmStatus(participant){
    const info = participant
    info.groupId = this.groupInfoInicio.GroupId
    this._callComponents.concedAdmAtatus(info).subscribe((data) => {
      document.location.reload()
    })
  }


  onSubmit(event: any) {
    const data = event.value
    data.GroupId = this.groupInfoInicio.GroupId

    if( event.value.groupDesc !== this.groupInfoInicio.groupDesc ){
      if(event.value.groupDesc.length <= 70){

        this._callComponents.changeGroupInfo(data).subscribe(() => {
          document.location.reload();

        })
      }else{
        alert('Description its too long.(MAX 70 letters).')
      }
    }
  }
}
