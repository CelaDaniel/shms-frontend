import { Component, OnInit } from '@angular/core';
import {
    ParkingFloorResponseType,
    ParkingFloorArrayResponseType,
    ParkingFloorService,
} from '../parking-floor.service';
import { IParkingFloor } from '../parking-floor.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';
import { UserRoles } from 'src/app/enums/roles.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-parking-floor-list',
    templateUrl: './parking-floor-list.component.html',
    styleUrls: ['./parking-floor-list.component.scss'],
})
export class ParkingFloorListComponent implements OnInit {
    userRoles = UserRoles;
    parkingFloors: IParkingFloor[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'buildingNumber',
        'nrParkingSpots',
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
            name: 'parkingSpotNumber',
            label: 'ParkingSpot Number',
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

    constructor(
        protected parkingFloorService: ParkingFloorService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.parkingFloorService
            .query({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: ParkingFloorArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IParkingFloor> = res.body?.data!;
                    this.parkingFloors = data.content ?? [];
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
        this.parkingFloorService.delete(this.floorId!).subscribe({
            next: (res: ParkingFloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message!;
                this.showSnackBar(message);
                const data: IParkingFloor = res.body?.data!;
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
