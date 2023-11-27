import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorListComponent } from './floor-list/floor-list.component';
import { FloorDetailsComponent } from './floor-details/floor-details.component';
import { FloorFormComponent } from './floor-form/floor-form.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: FloorListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: FloorDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        data: { roles: [UserRoles.MANAGER] },
        component: FloorFormComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        data: { roles: [UserRoles.MANAGER] },
        component: FloorFormComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FloorRoutingModule {}
