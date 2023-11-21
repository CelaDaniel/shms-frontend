import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevatorListComponent } from './elevator-list/elevator-list.component';
import { ElevatorDetailsComponent } from './elevator-details/elevator-details.component';
import { ElevatorFormComponent } from './elevator-form/elevator-form.component';

const routes: Routes = [
    {
        path: '',
        component: ElevatorListComponent,
    },
    {
        path: ':id/view',
        component: ElevatorDetailsComponent,
    },
    {
        path: 'new',
        component: ElevatorFormComponent,
    },
    {
        path: ':id/edit',
        component: ElevatorFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ElevatorRoutingModule {}
