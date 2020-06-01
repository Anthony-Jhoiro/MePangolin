import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  /**
   * Intercept response and update jwt token
   * @param req la requête interceptée
   * @param next la requête récupérée ensuite
   */
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 403) {
        localStorage.removeItem('access_token');
        location.reload();
      }

      const error = err.statusText || err.error.message;
      return throwError(error);

    }), map((res: any) => {
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('access_token', res.headers.get('authorization'));
      }
      return res;
    }));

  }

}
