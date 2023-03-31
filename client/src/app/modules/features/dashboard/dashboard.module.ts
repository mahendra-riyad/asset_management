import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DashboardComponent } from "./dashboard.component";
import { AssetsModule } from "./assets/assets.module";

const routes:  Routes= [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  
  imports: [CommonModule, RouterModule, MatToolbarModule, RouterModule.forChild(routes), AssetsModule],
  providers: [],
})
export class DashboardModule {}
