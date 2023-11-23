import { Component, OnInit } from '@angular/core';
import {
    ParkingSpotResponseType,
    ParkingSpotArrayResponseType,
    ParkingSpotService,
} from '../parking-spot.service';
import { IParkingSpot } from '../parking-spot.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';

@Component({
    selector: 'app-parking-spot-list',
    templateUrl: './parking-spot-list.component.html',
    styleUrls: ['./parking-spot-list.component.scss'],
})
export class ParkingSpotListComponent implements OnInit {
    parkingSpots: IParkingSpot[] = [];
    displayedColumns: string[] = ['id', 'number', 'parkingFloorsNo', 'actions'];

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
            name: 'parkingFloorNumber',
            label: 'ParkingFloor Number',
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

    constructor(protected parkingSpotService: ParkingSpotService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.parkingSpotService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
            })
            .subscribe({
                next: (res: ParkingSpotArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IParkingSpot> = res.body?.data!;
                    this.parkingSpots = data.content ?? [];
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

    deleteSpot(spot: IParkingSpot): void {
        this.parkingSpotService.delete(spot.id!).subscribe({
            next: (res: ParkingSpotResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingSpot = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
