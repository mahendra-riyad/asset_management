import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { LOGIN, SIGNUP } from '../../constant/routes';
import { AccountGuard } from 'src/app/guards/account.guards';

const routes:  Routes= [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: LOGIN.path,
        pathMatch: 'full'
      },
      {
        path: LOGIN.path,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        // canActivate: [AccountGuard], canLoad: [AccountGuard]
      },
      {
        path: SIGNUP.path,
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule),
        // canActivate: [AccountGuard], canLoad: [AccountGuard]
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountRoutingModule { }
