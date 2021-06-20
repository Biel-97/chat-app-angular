import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
})
export class NewGroupComponent implements OnInit {
  constructor(
    private _callComponents: CallComponentsService,
    private _auth: AuthenticateService
  ) {}

  contactList: any
  participantsList = [];
  goNextStep: boolean = false;
  MuteStatus: boolean = false;
  _editName:boolean = false
  _editDescription: boolean = false

  createdAt:string = this.formatAMPM(new Date)
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  groupDetails: any = {
    roomName: '',
    description: '',
  };

  ngOnInit(): void {
    this._callComponents.getContacts().subscribe((data: any) => {
      this.contactList = data.User.contacts;
    });
  }

  cancelNewGroup() {
    this._callComponents.showRooms.emit(true);
    this._callComponents.showContacts.emit(false);
    this._callComponents.addContactGroup.emit(false)
    this._callComponents.showNewGroup.emit(false);
    this.goNextStep = false;
    for (var i = 0; i <= this.participantsList.length; i++) {
      this.participantsList.pop();
    }
  }

  addParticipants(name: string, email: string) {
    for (var i = 0; i < this.participantsList.length; i++) {
      if (this.participantsList[i].email === email) {
        this.participantsList.splice(i, 1);
      }
    }
    this.participantsList.push({ name, email });
    for(var i = 0; i < this.contactList.length; i++){
      if(this.contactList[i].email == email){
        this.contactList.splice(i, 1)
        // console.log(this.contactList[i])
      }
    }
  }

  removeParticipants(name: string, email: string) {
    for (var i = 0; i < this.participantsList.length; i++) {
      if (this.participantsList[i].email === email) {
        this.participantsList.splice(i, 1);
      }
    }
    this.contactList.push({ name, email })
  }

  nextStep() {
    if (this.participantsList.length >= 1) {
      this.goNextStep = true;
    }
  }

  editTitle(){
    this._editName = !this._editName
  }
  editDescription(){
    this._editDescription = !this._editDescription

  }

  checkBox(status: boolean) {
    this.MuteStatus = !status;
  }


  newGroupDone() {
    this._auth.authenticate().subscribe((user: any) => {
      if(this.groupDetails.roomName.trim().length >= 3 ){

        this.participantsList.push({
          name: user.name,
          email: user.email,
          status: 'administrator',
        });

        this.groupDetails.participants = this.participantsList;
        this.groupDetails.creator = { name: user.name, email: user.email };

        this._callComponents.addNewGroup(this.groupDetails).subscribe((data: any) => {
          if (data.error) {
            alert(data.error);
            this.back();
          } else {
            this.back();
            document.location.reload()
          }
        });
      }else{
        alert('group name is too short')
      }
    });
  }

  back() {
    this.participantsList = [];
    this.groupDetails = {}
    this.groupDetails = {
      roomName: 'tittle',
      description: 'Group description.',
    }
    this.goNextStep = false;
    this._callComponents.showRooms.emit(true);
    this._callComponents.showContacts.emit(false);
    this._callComponents.addContactGroup.emit(false);

    this._callComponents.showNewGroup.emit(false);
  }
  addMoreParticipants(){
    this.goNextStep = false
  }
}
