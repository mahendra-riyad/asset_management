import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  modalData: any = {
    message: '',
    confirmButtonText: `Yes`,
    cancelButtonText: `No`
  };

  /**
   * Creates an instance of confirmation modal component.
   * @param dialogRef dialog ref instance from material dialog
   * @param data injectted data
   * @param dialog mat dialog from material dialog
   */
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog
  ) {
    this.modalData = { ...this.modalData, ...this.data };
  }


  /**
   * event on closing/cancelling dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Confirms modal component
   * @returns  void
   */
  confirm() {
    this.dialogRef.close(true);
  }
}
