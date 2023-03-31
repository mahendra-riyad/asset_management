import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';

const routes:  Routes= [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
      ReactiveFormsModule,
      MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    AbsoluteRoutingModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
