import { CallComponentsService } from './../shared/call-components.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../shared/authenticate.service';


@Injectable({
  providedIn: 'root'
})
  export class AuthRoomGuard implements CanActivateChild {

  constructor(
    private _callComponents: CallComponentsService,
    private _auth: AuthenticateService,
    private _route: Router
  ){}

  acessRoom:boolean = true
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean>|boolean {

    this._callComponents.room_Id.subscribe((data) => {
      this._auth.authenticateRoom(data).subscribe((roomstatus: boolean) => {
        this.acessRoom = roomstatus
      })

    })

    if(this.acessRoom){
      return true
    }
    this._route.navigate(['/lobby'])
    return false

  }

}


