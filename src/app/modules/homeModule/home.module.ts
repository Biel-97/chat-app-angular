import { LobbyScreenComponent } from './../../components/lobby-screen/lobby-screen.component';
import { MatIconModule } from '@angular/material/icon';
import { CallComponentsService } from './../../shared/call-components.service';
import { NewGroupComponent } from './../../components/new-group/new-group.component';
import { PrivateRoomComponent } from './../../components/private-room/private-room.component';
import { SocketService } from './../../shared/socket.service';
import { PublicRoomComponent } from './../../components/public-room/public-room.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home.routing.module'
import { LobbyComponent } from 'src/app/components/lobby/lobby.component';
import { MenuComponent } from '../../components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import { NewContactComponent } from 'src/app/components/new-contact/new-contact.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    HomeComponent,
    PublicRoomComponent,
    PrivateRoomComponent,
    LobbyComponent,
    MenuComponent,
    NewGroupComponent,
    NewContactComponent,
    LobbyScreenComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    SocketService,
    CallComponentsService
  ]
})
export class HomeModule { }
