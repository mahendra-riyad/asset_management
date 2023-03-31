import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    FeaturesComponent
} from './features.component';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { DASHBOARD } from 'src/app/constant/routes';


const routes:  Routes= [{
    path: '',
    component: FeaturesComponent,
    children: [{
            path: '',
            redirectTo: DASHBOARD.path,
            pathMatch: 'full'
        },
        {
            path: DASHBOARD.path,
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        },
       
    ]

}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
})
export class FeaturesRoutingModule {}
