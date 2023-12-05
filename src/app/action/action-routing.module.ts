import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionDetailsComponent } from './action-details/action-details.component';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.ADMIN] },
        component: ActionListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.ADMIN] },
        component: ActionDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActionRoutingModule {}
