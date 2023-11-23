import { Component, OnInit } from '@angular/core';
import {
    ParkingFloorResponseType,
    ParkingFloorArrayResponseType,
    ParkingFloorService,
} from '../parking-floor.service';
import { IParkingFloor } from '../parking-floor.model';
import { IData } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';

@Component({
    selector: 'app-parking-floor-list',
    templateUrl: './parking-floor-list.component.html',
    styleUrls: ['./parking-floor-list.component.scss'],
})
export class ParkingFloorListComponent implements OnInit {
    parkingFloors: IParkingFloor[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'buildingNumber',
        'parkingSpotsNo',
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

    constructor(protected parkingFloorService: ParkingFloorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.parkingFloorService.getAll(filter).subscribe({
            next: (res: ParkingFloorArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IParkingFloor> = res.body?.data!;
                this.parkingFloors = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteFloor(floor: IParkingFloor): void {
        this.parkingFloorService.delete(floor.id!).subscribe({
            next: (res: ParkingFloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingFloor = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
