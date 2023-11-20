import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';

@NgModule({
    imports: [SharedModule, ApartmentRoutingModule],
    declarations: [
        ApartmentListComponent,
        ApartmentDetailsComponent,
        ApartmentFormComponent,
    ],
})
export class ApartmentModule {}
