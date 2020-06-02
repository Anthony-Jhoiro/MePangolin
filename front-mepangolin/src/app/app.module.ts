import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PangolinsComponent } from './pangolins/pangolins.component';
import { PangolinDetailComponent } from './pangolin-detail/pangolin-detail.component';
import { MypageComponent } from './mypage/mypage.component';
import { RegisterComponent } from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./tools/interceptors/error.interceptor";
import {JwtInterceptor} from "./tools/interceptors/jwt.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TagInputModule} from "ngx-chips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PangolinsComponent,
    PangolinDetailComponent,
    MypageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TagInputModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
