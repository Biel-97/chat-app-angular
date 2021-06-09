import { CallComponentsService } from './../../shared/call-components.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-participant-settings',
  templateUrl: './dialog-participant-settings.component.html',
  styleUrls: ['./dialog-participant-settings.component.css']
})
export class DialogParticipantSettingsComponent implements OnInit {

  constructor(
    private _router: Router,
    private _callComponents: CallComponentsService
  ) { }

  ngOnInit(): void { }



}
