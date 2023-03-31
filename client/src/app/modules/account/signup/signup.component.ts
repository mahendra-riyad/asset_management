import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Validators } from '@angular/forms';
import { AccountService } from '../account.service';

interface IUser {
  token?: any;
  role?: any;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;

  hide = true;

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login(data:any) {
    this.loading = true;
    this.accountService.signup(data).subscribe(
      (result:any) => {
        this.auth.setToken(result['token']);
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err)
        this.errorMessage = "Problem with login, try again"
        this.error = true;
        this.loading = false;
        this.signupForm.reset();
      }
    );
  }
}
