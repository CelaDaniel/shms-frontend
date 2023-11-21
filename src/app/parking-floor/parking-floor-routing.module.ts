import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingFloorListComponent } from './parking-floor-list/parking-floor-list.component';
import { ParkingFloorDetailsComponent } from './parking-floor-details/parking-floor-details.component';
import { ParkingFloorFormComponent } from './parking-floor-form/parking-floor-form.component';

const routes: Routes = [
    {
        path: '',
        component: ParkingFloorListComponent,
    },
    {
        path: ':id/view',
        component: ParkingFloorDetailsComponent,
    },
    {
        path: 'new',
        component: ParkingFloorFormComponent,
    },
    {
        path: ':id/edit',
        component: ParkingFloorFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ParkingFloorRoutingModule {}
