import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/shared/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  {
  constructor(
    private _auth: AuthenticateService,
    private _router: Router
    ) {}


  loginPage(){
    this._router.navigate(['/login'])
  }
  register(values: any): void {
    if (values.password == values.password2) {
      this._auth.Register(values).subscribe(
        (data: any) => {
          if (data.error) {
            alert(data.error);
            this._auth.UserStatus = false;

            localStorage.clear()
          } else {

            localStorage.setItem('token', data.token);
            localStorage.setItem('User_id', data.userInfo._id);
            this._auth.UserStatus = true;

            this._router.navigate(['/']);
          }
        },
        (error: any) => {console.log(error)}
      );

    } else {
      console.log('erro, senhas incompativeis');
    }
  }
}
