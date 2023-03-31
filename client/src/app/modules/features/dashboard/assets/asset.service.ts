import { Injectable } from "@angular/core";
import { ADD_ASSET, DELETE_ASSET, GET_ASSET_DETAIL, GET_ASSET_LIST } from "src/app/constant/urls";

import { FileUploadService } from "src/app/services/file-upload.service";
import { HttpService } from "src/app/services/http.service";

@Injectable({
  providedIn: "root",
})
export class AssetService {
  constructor(
    private http: HttpService,
    private fileUploadService: FileUploadService
  ) {}

  uploadFiles(files: File[]) {
    return this.fileUploadService.uploadMultipleFiles(files);
  }
  
  addAsset(formdata: any) {
    return this.http.post(ADD_ASSET, { ...formdata }).toPromise();
  }

  getAssetDetail(assetId: string) {
    return this.http.get(GET_ASSET_DETAIL(assetId)).toPromise();
  }

    
  updateAsset(formdata: any) {
    return this.http.put(ADD_ASSET, { ...formdata }).toPromise();
  }

  getAssetList(data: any = {}) {
    return this.http.get(GET_ASSET_LIST, data);
  }
  deleteAsset(assetId: string) {
    return this.http.delete(DELETE_ASSET(assetId)).toPromise();
  }
}
