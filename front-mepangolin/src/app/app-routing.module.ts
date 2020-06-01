import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FriendsComponent} from "./friends/friends.component";
import {PangolinsComponent} from "./pangolins/pangolins.component";
import {MypageComponent} from "./mypage/mypage.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'friends/:friendId', component: FriendsComponent },
  { path: 'pangolins/:pangolinId', component: PangolinsComponent },
  { path: 'pangolins', component: PangolinsComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'me', component: MypageComponent },
  { path: '**', redirectTo: '/pangolins' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
