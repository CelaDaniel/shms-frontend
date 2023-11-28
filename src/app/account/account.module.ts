import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from '../account/profile/profile.component';
import { ChangePasswordComponent } from '../account/change-password/change-password.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
    imports: [SharedModule, AccountRoutingModule],
    declarations: [ProfileComponent, ChangePasswordComponent],
})
export class AccountModule {}
