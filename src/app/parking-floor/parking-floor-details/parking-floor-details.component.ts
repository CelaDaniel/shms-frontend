import { Component, OnInit } from '@angular/core';
import {
    ParkingFloorResponseType,
    ParkingFloorService,
} from '../parking-floor.service';
import { ActivatedRoute } from '@angular/router';
import { IParkingFloor } from '../parking-floor.model';

@Component({
    selector: 'app-parking-floor-details',
    templateUrl: './parking-floor-details.component.html',
    styleUrls: ['./parking-floor-details.component.scss'],
})
export class ParkingFloorDetailsComponent implements OnInit {
    floor: IParkingFloor | null = null;
    parkingSpotsColumns: string[] = ['id', 'number', 'actions'];

    constructor(
        protected parkingFloorService: ParkingFloorService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.parkingFloorService.getById(id).subscribe({
            next: (res: ParkingFloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingFloor = res.body?.data!;
                this.floor = data;
                console.log(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
