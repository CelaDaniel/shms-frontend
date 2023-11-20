import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';

const routes: Routes = [
    {
        path: '',
        component: ApartmentListComponent,
    },
    {
        path: ':id/view',
        component: ApartmentDetailsComponent,
    },
    {
        path: 'new',
        component: ApartmentFormComponent,
    },
    {
        path: ':id/edit',
        component: ApartmentFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApartmentRoutingModule {}
