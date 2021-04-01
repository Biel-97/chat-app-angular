import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../shared/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class DenyLoginGuard implements CanActivate {
  constructor(private _auth: AuthenticateService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if (this._auth.loggedIn()) {
      this._router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
}
