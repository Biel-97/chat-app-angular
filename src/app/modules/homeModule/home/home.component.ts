import { AuthenticateService } from 'src/app/shared/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _auth: AuthenticateService,
    private _router: Router
    ) { }

  rooms:any=[]

  getPublicRoom(){
    this._router.navigate(['/public'])
  }
  goToLobby(){
    this._router.navigate(['/lobby'])
  }
  ngOnInit(): void {
    this._auth.authenticate().subscribe(
      (data: any) => {
        if(data.error){
          console.log(data.error)
          this._auth.showHeaderEmitter.emit(false)
          this._router.navigate(['/login'])
          localStorage.clear()
        }
      },
      error => console.log(error)
    )

  }

}
