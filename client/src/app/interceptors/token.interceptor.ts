import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';
import { LOGIN } from '../constant/routes';
import { ApiConfig } from '../models/api.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
      private _utilityService: UtilityService,
    private authService: AuthService
  ) {
  }
  intercept(
    request: any,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers: any = {};
    const token = this.authService.getToken();
    let config: ApiConfig;
    config = JSON.parse(request?.headers?.get('config'));
    if (token) {
      headers['authorization'] = 'Bearer ' + token;
    }

    let customHeader = {
      offset: new Date().getTimezoneOffset(),
    };

    if(config && config.optionalHeaders && Object.keys(config.optionalHeaders).length){
      customHeader = {...customHeader, ...config.optionalHeaders}
    }

    if (customHeader) {
        headers['offset'] = JSON.stringify(new Date().getTimezoneOffset());
      }

      request.headers.delete('config');
        request = request.clone({
        setHeaders: headers,
        });

    return next.handle(request).pipe(
      tap(
        (data) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (config) {
              this._utilityService.errorAlert(err);
            }
            if (
              err.status === 401 ||
              err.status === 440 ||
              err.status === 403
            ) {
              this.authService.clearStorage();
              this.router.navigate([LOGIN.fullUrl]);
            }
          }
        }
      )
    );
  }
}
