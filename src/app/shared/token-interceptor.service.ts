import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthenticateService) { }

  intercept(req: any, next: any){

    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._auth.getToken()}`
      }
    })
    return next.handle(tokenReq)
  }
}
