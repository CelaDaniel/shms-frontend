import { Component, OnInit } from '@angular/core';
import {
    BuildingArrayResponseType,
    BuildingResponseType,
    BuildingService,
} from '../building.service';
import { IBuilding } from '../building.model';
import { IData } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';

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

    constructor(protected buildingService: BuildingService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.buildingService.getAll(filter).subscribe({
            next: (res: BuildingArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IBuilding> = res.body?.data!;
                this.buildings = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
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
