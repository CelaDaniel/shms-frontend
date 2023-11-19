import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingListComponent } from './building-list/building-list.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';

const routes: Routes = [
    {
        path: '',
        component: BuildingListComponent,
    },
    {
        path: ':id/view',
        component: BuildingDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BuildingRoutingModule {}
