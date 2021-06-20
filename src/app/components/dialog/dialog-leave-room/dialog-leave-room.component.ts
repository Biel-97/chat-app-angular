import { CallComponentsService } from './../../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * @title Dialog with header, scrollable content and actions
 */
 @Component({
  selector: 'app-dialog-leave-room',
  templateUrl: './dialog-leave-room.component.html',
  styleUrls: ['./dialog-leave-room.component.css']
})
export class DialogLeaveRoomComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogLeaveRoomComponent>,
    public dialog: MatDialog,
    private _callComponents: CallComponentsService,
    private _router : Router
    ) {}

  ngOnInit(){

  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  leaveGroup() {
    this._callComponents.LeaveGroup(this._callComponents.startRoomId).subscribe((data :any) => {
      if(data.ok){
        this._router.navigate(['/lobby'])
        document.location.reload();
      }
    })
  }
}
