import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    imports: [SharedModule, AuthRoutingModule],
    declarations: [
        ProfileComponent,
        ResetPasswordComponent,
        ActivateUserComponent,
        ForgotPasswordComponent,
        LoginComponent,
        ChangePasswordComponent,
    ],
})
export class AuthModule {}
