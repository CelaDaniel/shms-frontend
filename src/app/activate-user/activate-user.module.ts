import { NgModule } from '@angular/core';
import { ActivateUserComponent } from './activate-user.component';
import { SharedModule } from '../shared/shared.module';
import { ActivateUserRoutingModule } from './activate-user-routing.module';

@NgModule({
    imports: [SharedModule, ActivateUserRoutingModule],
    declarations: [ActivateUserComponent],
})
export class ActivateUserModule {}
