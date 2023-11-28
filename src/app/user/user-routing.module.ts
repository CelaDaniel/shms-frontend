import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.ADMIN] },
        component: UserListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.ADMIN] },
        component: UserDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        data: { roles: [UserRoles.ADMIN] },
        component: UserFormComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        data: { roles: [UserRoles.ADMIN] },
        component: UserFormComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
