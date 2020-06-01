import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FriendsComponent} from "./friends/friends.component";
import {PangolinsComponent} from "./pangolins/pangolins.component";
import {MypageComponent} from "./mypage/mypage.component";
import {AuthGuard} from "./tools/guards/auth.guard";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'friends/:friendId', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'pangolins/:pangolinId', component: PangolinsComponent, canActivate: [AuthGuard] },
  { path: 'pangolins', component: PangolinsComponent, canActivate: [AuthGuard] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'me', component: MypageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/pangolins', canActivate: [AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
