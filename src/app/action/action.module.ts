import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActionRoutingModule } from './action-routing.module';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionDetailsComponent } from './action-details/action-details.component';
import { DeleteAllModalComponent } from './delete-all-modal/delete-all-modal.component';

@NgModule({
    imports: [SharedModule, ActionRoutingModule],
    declarations: [
        ActionListComponent,
        ActionDetailsComponent,
        DeleteAllModalComponent,
    ],
})
export class ActionModule {}
