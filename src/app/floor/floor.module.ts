import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FloorRoutingModule } from './floor-routing.module';
import { FloorListComponent } from './floor-list/floor-list.component';
import { FloorDetailsComponent } from './floor-details/floor-details.component';
import { FloorFormComponent } from './floor-form/floor-form.component';

@NgModule({
    imports: [SharedModule, FloorRoutingModule],
    declarations: [
        FloorListComponent,
        FloorDetailsComponent,
        FloorFormComponent,
    ],
})
export class FloorModule {}
