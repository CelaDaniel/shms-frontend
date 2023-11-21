import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ParkingFloorRoutingModule } from './parking-floor-routing.module';
import { ParkingFloorListComponent } from './parking-floor-list/parking-floor-list.component';
import { ParkingFloorDetailsComponent } from './parking-floor-details/parking-floor-details.component';
import { ParkingFloorFormComponent } from './parking-floor-form/parking-floor-form.component';

@NgModule({
    imports: [SharedModule, ParkingFloorRoutingModule],
    declarations: [
        ParkingFloorDetailsComponent,
        ParkingFloorListComponent,
        ParkingFloorFormComponent,
    ],
})
export class ParkingFloorModule {}
