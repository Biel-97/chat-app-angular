import { DenyLoginGuard } from './guards/deny-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { HomeModule } from './modules/homeModule/home.module';
import { LoginModule } from './modules/loginModule/login.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavHeaderComponent } from './components/nav-header/nav-header.component';

import {AuthenticateService} from './shared/authenticate.service'
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfoComponent } from './components/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
    ],
  providers: [ AuthGuard, AuthenticateService, DenyLoginGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
