import { Injectable } from "@angular/core";
import { LOGIN, SIGNUP } from "src/app/constant/urls";
import { HttpService } from "src/app/services/http.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpService) {}

  login(data: any) {
    return this.http.post(LOGIN, { ...data });
  }

  signup(data: any) {
    return this.http.post(SIGNUP, { ...data });
  }
}
