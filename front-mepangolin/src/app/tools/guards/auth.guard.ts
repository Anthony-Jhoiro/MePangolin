import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) {}

  /**
   * Définit si l'utilisateur peut aller sur l'url
   */
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // si l'utilisateur a un 'access_token' dans son localstorage il peut
    const currentUser = localStorage.getItem('access_token');
    if (currentUser) {
      console.log(currentUser);
      return true;
    }

    // sinon il doit se connecter
    this.router.navigate(['/login']);
    return false;
  }

}
