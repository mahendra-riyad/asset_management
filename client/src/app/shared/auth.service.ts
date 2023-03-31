import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = 'it-st';

  constructor(private router: Router) { }

  setToken(token: string) {
    sessionStorage.setItem(this.token, token);
  }

  getToken() {
    return sessionStorage.getItem(this.token);
  }

  isLogged() {
    return this.getToken() !== null;
  }

  logout() {
    sessionStorage.removeItem(this.token);
    this.router.navigate(['/account/login']);
  }
}