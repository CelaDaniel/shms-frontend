import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ElevatorRoutingModule } from './elevator-routing.module';
import { ElevatorListComponent } from './elevator-list/elevator-list.component';
import { ElevatorDetailsComponent } from './elevator-details/elevator-details.component';
import { ElevatorFormComponent } from './elevator-form/elevator-form.component';

@NgModule({
    imports: [SharedModule, ElevatorRoutingModule],
    declarations: [
        ElevatorListComponent,
        ElevatorDetailsComponent,
        ElevatorFormComponent,
    ],
})
export class ElevatorModule {}
