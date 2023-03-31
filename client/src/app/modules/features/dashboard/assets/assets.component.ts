import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DASHBOARD } from 'src/app/constant/routes';
import { AssetService } from './asset.service';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  assetList: any = [];

  filterObject = {
    search: '',
    sortBy: 'createdAt'
  }

  constructor(
    public dialog: MatDialog,
    private assetService: AssetService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    route.queryParams.subscribe(p => {
      const queryParams: any = this.route.snapshot.queryParams;

      if (queryParams?.search) {
        this.filterObject.search = queryParams.search
      }

      if (queryParams?.sortBy) { 
        this.filterObject.sortBy = queryParams.sortBy
      }

      this.getAssetList();
    });
   }

  ngOnInit() {
    
  }

  async onSelectChange(event: any) {
    this.router.navigate([DASHBOARD.fullUrl], { queryParams: this.filterObject });
  }

  async search() {
    this.router.navigate([DASHBOARD.fullUrl], { queryParams: this.filterObject });
  }

  async getAssetList() {
    const res = await this.assetService.getAssetList(this.filterObject).toPromise();

    this.assetList = res?.data;
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
          this.getAssetList();
        }
      });
  }

  
  viewAsset(assetId:string): void {
    const dialogRef = this.dialog
      .open(ViewAssetComponent, {
        width: "500px",
        data: {
          assetId
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getAssetList();
        }
      });
  }

}


