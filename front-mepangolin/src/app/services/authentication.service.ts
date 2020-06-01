import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(login, password) {
    return this.http.post(environment.API_ENDPOINT + '/auth/login', {login, password});
  }
}
