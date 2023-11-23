import { Component, OnInit } from '@angular/core';
import {
    BuildingArrayResponseType,
    BuildingResponseType,
    BuildingService,
} from '../building.service';
import { IBuilding } from '../building.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';

@Component({
    selector: 'app-building-list',
    templateUrl: './building-list.component.html',
    styleUrls: ['./building-list.component.scss'],
})
export class BuildingListComponent implements OnInit {
    buildings: IBuilding[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'color',
        'floorNo',
        'parkingFlorNo',
        'elevatorNo',
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
            name: 'elevatorNumber',
            label: 'Elevator Number',
            type: 'text',
        },
        {
            name: 'parkingFloorNumber',
            label: 'ParkingFloor Number',
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

    constructor(protected buildingService: BuildingService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.buildingService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
            })
            .subscribe({
                next: (res: BuildingArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IBuilding> = res.body?.data!;
                    this.buildings = data.content ?? [];
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

    deleteBuilding(building: IBuilding): void {
        this.buildingService.delete(building.id!).subscribe({
            next: (res: BuildingResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IBuilding = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
