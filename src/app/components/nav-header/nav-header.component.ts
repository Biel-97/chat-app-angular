import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticateService} from '../../shared/authenticate.service'

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {


  constructor(
    private _auth: AuthenticateService,
    private _router : Router
  ) {}

  desloga(){
    localStorage.removeItem('token')
    localStorage.removeItem('User_id')

    this._auth.showHeaderEmitter.emit(false)
    this._router.navigate(['/login'])
  }
  ngOnInit(): void {
    // console.log(this.tokenError)
    // console.log(localStorage)

  }



}
