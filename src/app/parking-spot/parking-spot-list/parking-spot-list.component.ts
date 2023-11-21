import { Component, OnInit } from '@angular/core';
import {
    ParkingSpotResponseType,
    ParkingSpotArrayResponseType,
    ParkingSpotService,
} from '../parking-spot.service';
import { IParkingSpot } from '../parking-spot.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-parking-spot-list',
    templateUrl: './parking-spot-list.component.html',
    styleUrls: ['./parking-spot-list.component.scss'],
})
export class ParkingSpotListComponent implements OnInit {
    parkingSpots: IParkingSpot[] = [];
    displayedColumns: string[] = ['id', 'number', 'parkingSpotsNo', 'actions'];

    constructor(protected parkingSpotService: ParkingSpotService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.parkingSpotService.getAll().subscribe({
            next: (res: ParkingSpotArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IParkingSpot> = res.body?.data!;
                this.parkingSpots = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
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
