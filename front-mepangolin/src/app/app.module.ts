import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { PangolinsComponent } from './pangolins/pangolins.component';
import { PangolinDetailComponent } from './pangolin-detail/pangolin-detail.component';
import { MypageComponent } from './mypage/mypage.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FriendsComponent,
    PangolinsComponent,
    PangolinDetailComponent,
    MypageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
