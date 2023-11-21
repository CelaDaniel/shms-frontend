import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [SharedModule, UserRoutingModule],
    declarations: [
        UserListComponent,
        UserDetailsComponent,
        UserFormComponent,
        UserProfileComponent,
    ],
})
export class UserModule {}
