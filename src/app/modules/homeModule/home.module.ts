import { DialogParticipantSettingsComponent } from './../../components/dialog-participant-settings/dialog-participant-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDeleteContactComponent } from './../../components/dialog-delete-contact/dialog-delete-contact.component';
import { DialogLeaveRoomComponent } from './../../components/dialog-leave-room/dialog-leave-room.component';
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
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    HomeComponent,
    PublicRoomComponent,
    PrivateRoomComponent,
    LobbyComponent,
    MenuComponent,
    NewGroupComponent,
    NewContactComponent,
    LobbyScreenComponent,
    DialogLeaveRoomComponent,
    DialogDeleteContactComponent,
    DialogParticipantSettingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule
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
