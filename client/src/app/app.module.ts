import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Component
import { AppComponent } from "./app.component";
import { ErrorComponent } from "./error/error.component";
// Material
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AccountGuard } from "./guards/account.guards";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AuthService } from "./services/auth.service";
import { ConfirmationModalComponent } from "./modules/common/confirmation-modal/confirmation-modal.component";

@NgModule({
  declarations: [AppComponent, ErrorComponent, ConfirmationModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  providers: [
    AccountGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ConfirmationModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
