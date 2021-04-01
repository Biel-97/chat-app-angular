import { PublicRoomComponent } from './components/public-room/public-room.component';
import { InfoComponent } from './components/info/info.component';
import { DenyLoginGuard } from './guards/deny-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/loginModule/login/login.component';
import { RegisterComponent } from './modules/loginModule/register/register.component';
import { HomeComponent } from './modules/homeModule/home/home.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DenyLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [DenyLoginGuard],
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    component: PublicRoomComponent,
    canActivate: [AuthGuard],
  }
];
// const routing : ModuleWithProviders = RouterModule.forRoot(routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
