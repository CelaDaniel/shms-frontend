import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ParkingSpotRoutingModule } from './parking-spot-routing.module';
import { ParkingSpotListComponent } from './parking-spot-list/parking-spot-list.component';
import { ParkingSpotDetailsComponent } from './parking-spot-details/parking-spot-details.component';
import { ParkingSpotFormComponent } from './parking-spot-form/parking-spot-form.component';

@NgModule({
    imports: [SharedModule, ParkingSpotRoutingModule],
    declarations: [
        ParkingSpotDetailsComponent,
        ParkingSpotListComponent,
        ParkingSpotFormComponent,
    ],
})
export class ParkingSpotModule {}
