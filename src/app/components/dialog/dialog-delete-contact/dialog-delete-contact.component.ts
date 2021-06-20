
import { CallComponentsService } from './../../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * @title Dialog with header, scrollable content and actions
 */
 @Component({
  selector: 'app-dialog-delete-contact',
  templateUrl: './dialog-delete-contact.component.html',
  styleUrls: ['./dialog-delete-contact.component.css']
})
export class DialogDeleteContactComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteContactComponent>,
    public dialog: MatDialog,
    private _callComponents: CallComponentsService,
    private _router : Router
    ) {}

    ngOnInit(){



  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
  exitChat() {
    this._callComponents.exitPage.emit(false);
    this._router.navigate(['/lobby']);
    // document.location.reload()
  }

  deleteContact() {
    this._callComponents
      .deleteContact(this._callComponents.startRoomId)
      .subscribe((data: any) => {
        console.log(data);
        if (data.ok) {
          this.exitChat();
        }
      });
  }
}
