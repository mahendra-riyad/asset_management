import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ErrorComponent } from "./error/error.component";
import { ACCOUNT, DASHBOARD, FEATURES } from "./constant/routes";
import { AccountGuard } from "./guards/account.guards";

const routes: Routes = [
  { path: "", redirectTo: FEATURES.fullUrl, pathMatch: "full" },
  {
    path: FEATURES.path,
       canActivate: [AccountGuard],
    loadChildren: () => import('./modules/features/features.module').then(m => m.FeaturesModule)
},
  // {
  //   path: DASHBOARD.fullUrl,
  //   component: DashboardComponent,
  //   canActivate: [AccountGuard],
  //   canLoad: [AccountGuard],
  //   children: [{ path: "", component: AssetsComponent }],
  // },
  // { path: '**', component: ErrorComponent },
  {
    path: ACCOUNT.path,
    loadChildren: () =>
      import("./modules/account/account.module").then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
