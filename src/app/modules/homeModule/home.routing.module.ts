import { PrivateRoomComponent } from '../../components/private-room/private-room.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from 'src/app/components/lobby/lobby.component';
import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':id',
       component: PrivateRoomComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
