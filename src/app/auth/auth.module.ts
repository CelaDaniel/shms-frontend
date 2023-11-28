import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [SharedModule, AuthRoutingModule],
    declarations: [
        ResetPasswordComponent,
        ActivateUserComponent,
        ForgotPasswordComponent,
        LoginComponent,
    ],
})
export class AuthModule {}
