import { Component, OnInit } from '@angular/core';
import {
    FloorArrayResponseType,
    FloorResponseType,
    FloorService,
} from '../floor.service';
import { IFloor } from '../floor.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { ApartmentTypes } from 'src/app/enums/apartment-types.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-floor-list',
    templateUrl: './floor-list.component.html',
    styleUrls: ['./floor-list.component.scss'],
})
export class FloorListComponent implements OnInit {
    floors: IFloor[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'buildingNumber',
        'nrApartments',
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
            name: 'buildingNumber',
            label: 'Building Number',
            type: 'text',
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
    floorId?: number;

    constructor(protected floorService: FloorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.floorService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: FloorArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IFloor> = res.body?.data!;
                    this.floors = data.content ?? [];
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
        this.floorId = id;
        this.opened = true;
    }

    closeModal(): void {
        this.opened = false;
    }

    deleteFloor(): void {
        this.floorService.delete(this.floorId!).subscribe({
            next: (res: FloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IFloor = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
        this.closeModal();
    }
}
