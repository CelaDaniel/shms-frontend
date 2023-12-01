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
import { UserRoles } from 'src/app/enums/roles.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent {
    userRoles = UserRoles;
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
            name: 'student',
            label: 'Student',
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
            name: 'fee',
            label: 'Fee',
            type: 'number',
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
    opened = false;
    contractId?: number;

    constructor(
        protected contractService: ContractService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter?: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.contractService
            .query({
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

    openModal(id: number): void {
        this.contractId = id;
        this.opened = true;
    }

    closeModal(): void {
        this.opened = false;
    }

    deleteContract(): void {
        this.contractService.delete(this.contractId!).subscribe({
            next: (res: ContractResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message!;
                const data: IContract = res.body?.data!;
                this.showSnackBar(message);
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
        this.closeModal();
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
