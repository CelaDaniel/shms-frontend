import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ContractListComponent,
    },
    {
        path: ':id/view',
        component: ContractDetailsComponent,
    },
    {
        path: 'new',
        component: ContractFormComponent,
    },
    {
        path: ':id/edit',
        component: ContractFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContractRoutingModule {}
