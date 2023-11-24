import { Component, OnInit } from '@angular/core';
import {
    ElevatorArrayResponseType,
    ElevatorResponseType,
    ElevatorService,
} from '../elevator.service';
import { IElevator } from '../elevator.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-elevator-list',
    templateUrl: './elevator-list.component.html',
    styleUrls: ['./elevator-list.component.scss'],
})
export class ElevatorListComponent implements OnInit {
    elevators: IElevator[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'buildingNumber',
        'capacity',
        'maxWeight',
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

    constructor(protected elevatorService: ElevatorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.elevatorService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: ElevatorArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IElevator> = res.body?.data!;
                    this.elevators = data.content ?? [];
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

    deleteElevator(elevator: IElevator): void {
        this.elevatorService.delete(elevator.id!).subscribe({
            next: (res: ElevatorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IElevator = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
