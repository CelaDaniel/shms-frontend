import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorListComponent } from './floor-list/floor-list.component';
import { FloorDetailsComponent } from './floor-details/floor-details.component';
import { FloorFormComponent } from './floor-form/floor-form.component';

const routes: Routes = [
    {
        path: '',
        component: FloorListComponent,
    },
    {
        path: ':id/view',
        component: FloorDetailsComponent,
    },
    {
        path: 'new',
        component: FloorFormComponent,
    },
    {
        path: ':id/edit',
        component: FloorFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FloorRoutingModule {}
