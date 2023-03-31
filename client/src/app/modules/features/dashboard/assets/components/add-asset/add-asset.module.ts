import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddAssetComponent } from "./add-asset.component";
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';



@NgModule({
    declarations: [AddAssetComponent],
    imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, OwlDateTimeModule, OwlNativeDateTimeModule],
    providers: [],
    entryComponents: [AddAssetComponent],
    exports: [AddAssetComponent]
})
export class AddAssetModule {}
