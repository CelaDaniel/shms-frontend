import { Component } from '@angular/core';
import { IContract } from '../contract.model';
import {
    ContractArrayResponseType,
    ContractResponseType,
    ContractService,
} from '../contract.service';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent {
    contracts: IContract[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'startDate',
        'endDate',
        'signDate',
        'fee',
        'apartment',
        'student',
        'birthDate',
        'actions',
    ];

    constructor(protected contractService: ContractService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.contractService.getAll().subscribe({
            next: (res: ContractArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IContract> = res.body?.data!;
                this.contracts = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteContract(contract: IContract): void {
        this.contractService.delete(contract.id!).subscribe({
            next: (res: ContractResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IContract = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
