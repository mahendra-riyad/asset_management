import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { AccountRoutingModule } from './account.routing';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
  ]
})

export class AccountModule { }
