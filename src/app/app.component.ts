import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { SocketService } from './shared/socket.service';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'chat';
  ShowHeader: boolean
  list: any

  constructor(
    private authenticateService: AuthenticateService
    ) {  }


  ngOnInit(): void {

    this.authenticateService.showHeaderEmitter.subscribe(
      show => {
        this.ShowHeader = show
      }
    )

  }
}
