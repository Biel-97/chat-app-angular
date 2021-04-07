import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-options',
  templateUrl: './contact-options.component.html',
  styleUrls: ['./contact-options.component.css']
})
export class ContactOptionsComponent implements OnInit {

  private _privateChatId:string
  constructor(
    private _callComponents: CallComponentsService
  ) { }

  ngOnInit(): void {
  }

  createPrivateChat() {
    this._callComponents.addNewPrivateChat(this._privateChatId ).subscribe((data:any) => {
      setTimeout(() => {
        this._callComponents.getGroupId(this._privateChatId );
      }, 0);
    });
  }

  getId(contactID){
    console.log(contactID)
    this._privateChatId = contactID
  }

}
