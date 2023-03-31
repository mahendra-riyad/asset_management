import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AssetsComponent } from "./assets.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AddAssetModule } from "./components/add-asset/add-asset.module";
import { ViewAssetModule } from "./components/view-asset/view-asset.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AssetsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatDialogModule,
    AddAssetModule,
    ViewAssetModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
      MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AssetsComponent],
  exports: [AssetsComponent],
})
export class AssetsModule {}
