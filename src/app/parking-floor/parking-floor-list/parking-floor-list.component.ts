import { Component, OnInit } from '@angular/core';
import {
    ParkingFloorResponseType,
    ParkingFloorArrayResponseType,
    ParkingFloorService,
} from '../parking-floor.service';
import { IParkingFloor } from '../parking-floor.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-parking-floor-list',
    templateUrl: './parking-floor-list.component.html',
    styleUrls: ['./parking-floor-list.component.scss'],
})
export class ParkingFloorListComponent implements OnInit {
    parkingFloors: IParkingFloor[] = [];
    displayedColumns: string[] = ['id', 'number', 'parkingSpotsNo', 'actions'];

    constructor(protected parkingFloorService: ParkingFloorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.parkingFloorService.getAll().subscribe({
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
