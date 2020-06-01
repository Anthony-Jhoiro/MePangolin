import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  /**
   * Intercept all request from the front-end app and add the x-access-token header to them
   * @param request intercept request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get the access_token' from the localstorage
    let currentUser = localStorage.getItem('access_token');

    // if the token exists, add it to the header
    if (currentUser) {
      console.log(currentUser);
      request = request.clone({
        setHeaders: {
          "x-access-token": currentUser
        }
      });
    }

    return next.handle(request);
  }
}
