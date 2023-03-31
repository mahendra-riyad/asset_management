import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse, ApiConfig } from '../models/api.interface';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
    ) {
        this.apiUrl = environment.url;
    }

    post<T=any>(url: string, data: any, config: ApiConfig = { showLoader: true }): Observable<ApiResponse<T>> {
        return this.http.post<ApiResponse<T>>(this.apiUrl + url, data, this.getCustomHeader(config));
    }

    put<T=any>(url:string, data: any, config: ApiConfig = { showLoader: true }): Observable<ApiResponse<T>> {
        return this.http.put<ApiResponse<T>>(this.apiUrl + url, data, this.getCustomHeader(config));
    }

    patch<T=any>(url: string, data: any, config: ApiConfig = { showLoader: true }): Observable<ApiResponse<T>> {
        return this.http.patch<ApiResponse<T>>(this.apiUrl + url, data, this.getCustomHeader(config));
    }

    // Observable<ApiResponse<T>>
    get<T=any>(url: string, httpParams?: any, config: ApiConfig = { showLoader: true }): any {
        for (let item in httpParams) {
            if (httpParams[item] === '' || httpParams[item] === undefined || httpParams[item] === null) {
                delete httpParams[item];
            }
        }
        const header:any = this.getCustomHeader(config);
        if (httpParams) {
            header['params'] = httpParams;
        }
        return this.http.get<ApiResponse<T>>(this.apiUrl + url, header);
    }

    // : Observable<ApiResponse<T>>
    delete<T = any>(url: string,  httpParams?: any, config?: ApiConfig): any {
        for (let item in httpParams) {
            if (httpParams[item] === '' || httpParams[item] === undefined || httpParams[item] === null) {
                delete httpParams[item];
            }
        }
        const header: any = this.getCustomHeader(config);
        if (httpParams) {
            header['params'] = httpParams;
        }
        return this.http.delete<ApiResponse<T>>(
          this.apiUrl + url,
          header
        );
    }

    getCustomHeader(config: any) {
        return {
            headers: {
                config: JSON.stringify(config || {})
            }
        }
    }

    getExternalHeader(){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }
}
