import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
    imports: [SharedModule, UserRoutingModule],
    declarations: [UserListComponent, UserDetailsComponent, UserFormComponent],
})
export class UserModule {}
