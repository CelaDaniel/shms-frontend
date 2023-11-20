import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingListComponent } from './building-list/building-list.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { BuildingFormComponent } from './building-form/building-form.component';

const routes: Routes = [
    {
        path: '',
        component: BuildingListComponent,
    },
    {
        path: ':id/view',
        component: BuildingDetailsComponent,
    },
    {
        path: 'new',
        component: BuildingFormComponent,
    },
    {
        path: ':id/edit',
        component: BuildingFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BuildingRoutingModule {}
