import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../account/profile/profile.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';
import { ChangePasswordComponent } from '../account/change-password/change-password.component';

const routes: Routes = [
    {
        path: 'profile',
        data: {
            pageTitle: 'My Profile',
            roles: [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.USER],
        },
        component: ProfileComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'change-password',
        data: {
            pageTitle: 'Change Password',
            roles: [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.USER],
        },
        component: ChangePasswordComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
