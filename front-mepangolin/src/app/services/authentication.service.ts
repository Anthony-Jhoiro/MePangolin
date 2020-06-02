import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Call the service to try log the pangolin with the given credentials
   * @param login
   * @param password
   * @return Observable<any>
   */
  login(login, password) {
    return this.http.post(environment.API_ENDPOINT + '/auth/login', {login, password});
  }

  register(pangolin) {
    return this.http.post(environment.API_ENDPOINT + '/auth/register', pangolin);
  }

  /**
   * LogOut the current pangolin by removing his access token
   * from the localstorage and redirect him to the login page
   */
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
