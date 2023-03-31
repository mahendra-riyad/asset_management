import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route,
  CanLoad, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { LOGIN } from '../constant/routes';
import { DASHBOARD } from '../constant/routes';
// import { VALIDATE_TOKEN } from '../constant/urls';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AccountGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _http: HttpService,
    private auth: AuthService
  ) {

  }

  navigate() {
    this._router.navigate([LOGIN.fullUrl]);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.getToken()) {
      return this.navigate();
    } 
    return true;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.getToken()) {
      return this.navigate();
    } 
    return true;
  }
}
