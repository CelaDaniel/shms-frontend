import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    {
        path: 'activate-user',
        component: ActivateUserComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
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
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
