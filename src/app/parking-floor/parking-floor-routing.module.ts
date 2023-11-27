import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingFloorListComponent } from './parking-floor-list/parking-floor-list.component';
import { ParkingFloorDetailsComponent } from './parking-floor-details/parking-floor-details.component';
import { ParkingFloorFormComponent } from './parking-floor-form/parking-floor-form.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ParkingFloorListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ParkingFloorDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        data: { roles: [UserRoles.MANAGER] },
        component: ParkingFloorFormComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        data: { roles: [UserRoles.MANAGER] },
        component: ParkingFloorFormComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ParkingFloorRoutingModule {}
