import { Component, OnInit } from '@angular/core';
import {
    ApartmentArrayResponseType,
    ApartmentResponseType,
    ApartmentService,
} from '../apartment.service';
import { IApartment } from '../apartment.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { ApartmentTypes } from 'src/app/enums/apartment-types.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-apartment-list',
    templateUrl: './apartment-list.component.html',
    styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit {
    apartments: IApartment[] = [];
    apartmentsColumns: string[] = [
        'id',
        'number',
        'apartmentType',
        'area',
        'capacity',
        'floorNumber',
        'nrContracts',
        'hasKitchen',
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
            name: 'floorNumber',
            label: 'Floor Number',
            type: 'text',
        },
        {
            name: 'contractNumber',
            label: 'Contract Number',
            type: 'text',
        },
        {
            name: 'buildingNumber',
            label: 'Building Number',
            type: 'text',
        },
        {
            name: 'capacity',
            label: 'Capacity',
            type: 'number',
        },
        {
            name: 'apartmentType',
            label: 'Apartment Type',
            type: 'select',
            selectData: Object.values(ApartmentTypes),
        },
        {
            name: 'hasKitchen',
            label: 'Has Kitchen',
            type: 'boolean',
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
    apartmentId?: number;

    constructor(protected apartmentService: ApartmentService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.apartmentService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: ApartmentArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IApartment> = res.body?.data!;
                    this.apartments = data.content ?? [];
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
        this.apartmentId = id;
        this.opened = true;
    }

    closeModal(): void {
        this.opened = false;
    }

    deleteApartment(): void {
        this.apartmentService.delete(this.apartmentId!).subscribe({
            next: (res: ApartmentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IApartment = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
        this.closeModal();
    }
}
