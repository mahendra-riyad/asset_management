import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    RouterModule,
  ],
  providers:[]
})
export class FeaturesModule { }
