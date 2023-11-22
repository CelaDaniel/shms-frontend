import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContractRoutingModule } from './contract-routing.module';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ContractListComponent } from './contract-list/contract-list.component';

@NgModule({
    imports: [SharedModule, ContractRoutingModule],
    declarations: [
        ContractDetailsComponent,
        ContractFormComponent,
        ContractListComponent,
    ],
})
export class ContractModule {}
