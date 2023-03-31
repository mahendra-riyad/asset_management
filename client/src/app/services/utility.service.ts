import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog, 
  ) {}
 

  showAlert(message: string, duration = 3000) {
    this._snackBar.open(message, 'close', {
      duration,
    });
  }

  showFormError(message = `Please fill all required fields`) {
    this.showAlert(message);
  }

  errorAlert(error: any) {
    const duration = 3000;
    let data = {
      message:
        error && error.error && error.error.message
          ? error.error.message
          : `Something went wrong`,
    };

    this._snackBar.open(data?.message, 'close', {
      duration,
    });
  }

}
