import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { NgModule } from '@angular/core';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ContractListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ContractDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ContractFormComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: ContractFormComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContractRoutingModule {}
