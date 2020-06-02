import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  /**
   * Intercept response, update jwt token and handle authorisation problems
   * @param req intercepted request
   * @param next the request handler
   */
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

      // If there is a 401 error, logout the user
      if (err.status === 401) {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      }

      const error = err.statusText || err.error.message;
      return throwError(error);

    }), map((res: any) => {
      // If the request succeed, update the current jwt token with the one from the _token header
      if (res.status === 200 || res.status === 201) {
        const token = res.headers.get('_token');
        if (token) {
          localStorage.setItem('access_token', token);
        }
      }
      return res;
    }));

  }

}
