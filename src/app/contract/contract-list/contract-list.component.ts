import { Component } from '@angular/core';
import { IContract } from '../contract.model';
import {
    ContractArrayResponseType,
    ContractResponseType,
    ContractService,
} from '../contract.service';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';

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
        'initialValidDate',
        'endValidDate',
        'signDate',
        'fee',
        'apartment',
        'parkingSpot',
        'student',
        'actions',
    ];

    filterFields: IFilter[] = [
        {
            name: 'number',
            label: 'Number',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'apartmentNumber',
            label: 'Apartment Number',
            type: 'text',
        },
        {
            name: 'parkingSpotNumber',
            label: 'ParkingSpot Number',
            type: 'text',
        },
        {
            name: 'studentEmail',
            label: 'Student Email',
            type: 'text',
        },
        {
            name: 'initialValidDate',
            label: 'Start Date',
            type: 'date',
        },
        {
            name: 'endValidDate',
            label: 'End Date',
            type: 'date',
        },
        {
            name: 'signDate',
            label: 'Sign Date',
            type: 'date',
        },
        {
            name: 'deleted',
            label: 'Deleted',
            type: 'boolean',
        },
    ];

    filter?: { [key: string]: string };

    totalElements = 0;
    pageSize = PAGE_SIZE;
    page = 0;
    pageSizeOptions = PAGE_SIZE_OPTIONS;
    sortDirection?: string;
    sortColumn?: string;

    constructor(protected contractService: ContractService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter?: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.contractService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: ContractArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IContract> = res.body?.data!;
                    this.contracts = data.content ?? [];
                    const pageable: IPagination = data.pageable;
                    this.page = pageable.pageNumber;
                    this.pageSize = pageable.pageSize;
                    this.totalElements = pageable.totalElements;
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
    }

    handlePagination(paginationData: {
        pageIndex: number;
        pageSize: number;
    }): void {
        this.page = paginationData.pageIndex;
        this.pageSize = paginationData.pageSize;
        this.loadAll(this.filter);
    }

    sortChange(sortState: Sort) {
        this.sortColumn = sortState.active;
        this.sortDirection = sortState.direction.toUpperCase();
        this.loadAll(this.filter);
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
