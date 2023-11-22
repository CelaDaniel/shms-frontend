import { Component } from '@angular/core';
import { IContract } from '../contract.model';
import { ContractResponseType, ContractService } from '../contract.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contract-details',
    templateUrl: './contract-details.component.html',
    styleUrls: ['./contract-details.component.scss'],
})
export class ContractDetailsComponent {
    contract: IContract | null = null;

    constructor(
        private contractService: ContractService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = +params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.contractService.getById(id).subscribe({
            next: (res: ContractResponseType) => {
                const data: IContract = res.body?.data!;
                this.contract = data;
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
