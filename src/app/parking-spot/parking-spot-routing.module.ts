import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingSpotListComponent } from './parking-spot-list/parking-spot-list.component';
import { ParkingSpotDetailsComponent } from './parking-spot-details/parking-spot-details.component';
import { ParkingSpotFormComponent } from './parking-spot-form/parking-spot-form.component';

const routes: Routes = [
    {
        path: '',
        component: ParkingSpotListComponent,
    },
    {
        path: ':id/view',
        component: ParkingSpotDetailsComponent,
    },
    {
        path: 'new',
        component: ParkingSpotFormComponent,
    },
    {
        path: ':id/edit',
        component: ParkingSpotFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ParkingSpotRoutingModule {}
