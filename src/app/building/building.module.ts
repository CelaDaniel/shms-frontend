import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BuildingRoutingModule } from './building-routing.module';
import { BuildingListComponent } from './building-list/building-list.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { BuildingFormComponent } from './building-form/building-form.component';

@NgModule({
    imports: [SharedModule, BuildingRoutingModule],
    declarations: [BuildingListComponent, BuildingDetailsComponent, BuildingFormComponent],
})
export class BuildingModule {}
