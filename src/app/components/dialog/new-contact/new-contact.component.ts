import { CallComponentsService } from '../../../shared/call-components.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})


export class NewContactComponent implements OnInit {

 contact:object
  constructor(
    public dialogRef: MatDialogRef<NewContactComponent>,
    private _callComponents: CallComponentsService
    ) {}

    contactStatus: string
  ngOnInit(): void {
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  addContact( email:any ){
    if(!email.value){
      return  this.contactStatus = 'email its empty'
    }
    else{
      this._callComponents.addContacts(email.value).subscribe((data: any) => {
        if(data.error){
          this.contactStatus = data.error
        }else{
          this.cancelDialog()
          this._callComponents.newContact.emit(true)
        }
      })
    }
  }
}
