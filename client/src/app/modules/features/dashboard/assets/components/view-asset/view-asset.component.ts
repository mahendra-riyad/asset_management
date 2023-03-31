import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmationModalComponent } from "src/app/modules/common/confirmation-modal/confirmation-modal.component";
import { UtilityService } from "src/app/services/utility.service";
import { AssetService } from "../../asset.service";
import { AddAssetComponent } from "../add-asset/add-asset.component";

@Component({
  selector: "app-view-asset",
  templateUrl: "./view-asset.component.html",
  styleUrls: ["./view-asset.component.scss"],
})
export class ViewAssetComponent implements OnInit {
  assetId: string = "";
  assetDetail: any;

  isUpdated = false;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewAssetComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    private assetService: AssetService
  ) {
    this.assetId = data?.assetId;

    this.getAssetDetail();
  }

  ngOnInit() {}

  async getAssetDetail() {
    const res = await this.assetService.getAssetDetail(this.assetId);
    this.assetDetail = res?.data;
  }

  
  addAsset(assetId = null): void {
    const dialogRef = this.dialog
      .open(AddAssetComponent, {
        width: "500px",
        data: {
          assetId
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.isUpdated = true;
          this.getAssetDetail();
        }
      });
  }

  async deleteAsset(assetId: string) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete asset?' },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const res = await this.assetService.deleteAsset(this.assetId);

        this.utilityService.showAlert(`Asset deleted successfully`);

        this.isUpdated = true;
        this.cancel()
      }
    });
  }

  cancel() {
    this.dialogRef.close(this.isUpdated);
  }
}
