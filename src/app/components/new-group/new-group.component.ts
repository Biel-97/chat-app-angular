import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';

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

  contactList: object;
  participantsList = [];
  goNextStep: boolean;
  description: string = 'Add a group description';
  MuteStatus: boolean = false;

  ngOnInit(): void {
    this._callComponents.getContacts().subscribe((data: any) => {
      this.contactList = data.User.contacts;
    });
  }

  cancelNewGroup() {
    this._callComponents._showRooms.emit(true);
    this._callComponents._showContacts.emit(false);
    this._callComponents._showNewGroup.emit(false);
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
  }

  removeParticipants(name: string, email: string) {
    for (var i = 0; i < this.participantsList.length; i++) {
      if (this.participantsList[i].email === email) {
        this.participantsList.splice(i, 1);
      }
    }
  }

  nextStep() {
    if (this.participantsList.length >= 1) {
      this.goNextStep = true;
    }
  }
  changeDescription() {}

  checkBox(status: boolean) {
    this.MuteStatus = !status;
  }

  newGroupDone() {

    this._auth.authenticate().subscribe((user: any) => {
      this.participantsList.push({
        name: user.name,
        email: user.email,
        status: 'administrator',
      });

      let room = {
        roomName: 'Group test',
        creator: {
          name: user.name,
          email: user.email,
        },

        participants: this.participantsList,
        description: 'Group description',
      };
      this._callComponents.addNewGroup(room).subscribe((data: any) => {
        if (data.error) {
          console.log(data.error);
          this.back();
        } else {
          this.back();
        }
      });
    });
  }
  back() {
    this.participantsList = [];
    this.goNextStep = false;
    this._callComponents._showRooms.emit(true);
    this._callComponents._showContacts.emit(false);
    this._callComponents._showNewGroup.emit(false);
  }
}
