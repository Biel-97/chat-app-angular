import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthenticateService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean  {
    console.log('guard')
    if (this._auth.loggedIn()) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
}
