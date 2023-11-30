import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from '../account/profile/profile.component';
import { ChangePasswordComponent } from '../account/change-password/change-password.component';
import { AccountRoutingModule } from './account-routing.module';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';

@NgModule({
    imports: [SharedModule, AccountRoutingModule],
    declarations: [
        ProfileComponent,
        ChangePasswordComponent,
        UserProfileFormComponent,
    ],
})
export class AccountModule {}
