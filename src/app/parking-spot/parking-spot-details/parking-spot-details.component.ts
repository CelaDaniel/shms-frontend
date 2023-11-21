import { Component, OnInit } from '@angular/core';
import {
    ParkingSpotResponseType,
    ParkingSpotService,
} from '../parking-spot.service';
import { ActivatedRoute } from '@angular/router';
import { IParkingSpot } from '../parking-spot.model';

@Component({
    selector: 'app-parking-spot-details',
    templateUrl: './parking-spot-details.component.html',
    styleUrls: ['./parking-spot-details.component.scss'],
})
export class ParkingSpotDetailsComponent implements OnInit {
    spot: IParkingSpot | null = null;

    constructor(
        protected parkingSpotService: ParkingSpotService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.parkingSpotService.getById(id).subscribe({
            next: (res: ParkingSpotResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingSpot = res.body?.data!;
                this.spot = data;
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
