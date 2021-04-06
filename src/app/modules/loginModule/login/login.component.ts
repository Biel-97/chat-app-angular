import { Component, EventEmitter } from '@angular/core';
import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.css']
})
export class LoginComponent  {

  constructor(
    private _auth: AuthenticateService,
    private _router:Router
    ) { }
  showHeaderEmitter = new EventEmitter<boolean>();


  registerPage(){
    this._router.navigate(['/register'])
  }

  login(values:any): void{

    this._auth.Login(values.value)
    .subscribe(
      (data: any) => {
        if (data.error) {
        this._auth.UserStatus = false;
        localStorage.clear()
        alert(data.error);

      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('User_id', data.userInfo._id);
        this._auth.UserStatus = true;

        this._router.navigate(['/']);
      }
    }
    )

  }

}
