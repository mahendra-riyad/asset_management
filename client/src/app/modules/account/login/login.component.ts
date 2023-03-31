import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Validators } from '@angular/forms';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;

  hide = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login(data:any) {
    this.loading = true;
    this.accountService.login(data).subscribe(
      (result:any) => {
        this.auth.setToken(result['token']);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err)
        this.errorMessage = "Problem with login, try again"
        this.error = true;
        this.loading = false;
        this.loginForm.reset();
      }
    );
  }
}
