import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  IMAGE_FORMAT,
  IMAGE_FORMAT_ERROR,
  MAX_SIZE_ERROR,
} from "src/app/constant/app-constant";
import { onSelectFile } from "src/app/constant/file-input";
import { UtilityService } from "src/app/services/utility.service";
import { AssetService } from "../../asset.service";

@Component({
  selector: "app-add-asset",
  templateUrl: "./add-asset.component.html",
  styleUrls: ["./add-asset.component.scss"],
})
export class AddAssetComponent implements OnInit {
  assetId: string = "";
  imageUrl: string = "";
  loading: boolean = false;

  imageFormats = IMAGE_FORMAT;
  assetForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    date: new FormControl("", [Validators.required]),
    tags: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    location: new FormControl("", [Validators.required]),
    image: new FormControl(""),
  });
  imageFile: any;

  constructor(
    public dialogRef: MatDialogRef<AddAssetComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private utilityService: UtilityService,
    private assetService: AssetService
  ) {
    this.assetId = data?.assetId;

    if (this.assetId) {
      this.getAssetDetail();
    }
  }

  ngOnInit() {}

  async getAssetDetail() {
    const res = await this.assetService.getAssetDetail(this.assetId);

    this.patchAssetFormValues(res?.data);
  }

  async patchAssetFormValues(data: any) {
    data.tags = data?.tags.join(',');

    this.assetForm.patchValue({
      ...data,
    });
    this.imageUrl = data.image;
  }

  async onSelectProfilePic(event: Event) {
    try {
      let result = await onSelectFile(event);
      this.imageFile = result[0].file;
      this.imageUrl = result[0].url;
    } catch (err: any) {
      if (err.type) {
        this.utilityService.showAlert(IMAGE_FORMAT_ERROR);
      } else if (err.size) {
        this.utilityService.showAlert(MAX_SIZE_ERROR());
      }
    }
  }

  deleteProfilePic() {
    this.imageUrl = "";
    this.assetForm?.get("image")?.setValue("");
  }

  async addAsset() {
    try {
      if (this.assetForm.invalid) {
        this.assetForm.markAllAsTouched();
        return;
      }
  
      this.loading = true;
  
      if (this.imageFile) {
        const imageFile: any[] = await this.assetService.uploadFiles([
          this.imageFile,
        ]);
  
        console.log({ imageFile });
        this.imageUrl = imageFile[0]?.Location;
      }
      if (!this.imageUrl) {
        this.loading = false;
        this.utilityService.showAlert("Please select a file to upload");
        return;
      }
  
      this.assetForm?.get("image")?.setValue(this.imageUrl);
  
      let formdata = { ...this.assetForm.value };
  
      if (this.assetId) {
  
        formdata["assetId"] = this.assetId;
        
        const res = await this.assetService.updateAsset(formdata);
  
        this.utilityService.showAlert(`Asset updated successfully!`)
      } else {
        const res = await this.assetService.addAsset(formdata);
        this.utilityService.showAlert(`New asset added successfully!`)
      }
  
      this.loading = false;
      this.dialogRef.close(true);
    }
    catch (error: any) { 
      if (error.status === 409) {
        this.utilityService.showAlert(error?.error?.error)
      }
      this.loading = false;
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
