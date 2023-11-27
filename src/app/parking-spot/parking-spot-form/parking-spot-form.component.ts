import { Component, OnInit } from '@angular/core';
import {
    ParkingSpotResponseType,
    ParkingSpotService,
} from '../parking-spot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingSpot, IParkingSpot } from '../parking-spot.model';
import { IParkingFloor } from 'src/app/parking-floor/parking-floor.model';
import {
    ParkingFloorListResponseType,
    ParkingFloorService,
} from 'src/app/parking-floor/parking-floor.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-parking-spot-form',
    templateUrl: './parking-spot-form.component.html',
    styleUrls: ['./parking-spot-form.component.scss'],
})
export class ParkingSpotFormComponent implements OnInit {
    parkingFloors: IParkingFloor[] = [];
    parkingSpotForm: FormGroup;
    isEditMode = false;
    parkingSpotId?: number;

    filteredParkingFloors?: Observable<IParkingFloor[]>;

    constructor(
        protected parkingspotService: ParkingSpotService,
        private parkingFloorService: ParkingFloorService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.parkingSpotForm = this.fb.group({
            number: ['', [Validators.required]],
            description: [''],
            parkingFloor: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.parkingSpotId = +params['id'];
                this.loadById(this.parkingSpotId);
            }
        });
        this.loadData();
    }

    loadById(id: number): void {
        this.parkingspotService.getById(id).subscribe({
            next: (res: ParkingSpotResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingSpot = res.body?.data!;

                this.parkingSpotForm.patchValue(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    loadData(): void {
        this.parkingFloorService.getAll().subscribe({
            next: (res: ParkingFloorListResponseType) => {
                const data: IParkingFloor[] = res.body?.data ?? [];
                this.parkingFloors = data;
                this.filteredParkingFloors = this.parkingSpotForm
                    .get('parkingFloor')!
                    .valueChanges.pipe(
                        startWith(''),
                        map((value) => this._filterParkingFloors(value))
                    );
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    private _filterParkingFloors(
        value: string | IParkingFloor
    ): IParkingFloor[] {
        const filterValue =
            value && typeof value === 'string' ? value.toLowerCase() : '';

        return this.parkingFloors.filter((floor) =>
            floor?.number?.toLowerCase().includes(filterValue)
        );
    }

    displayParkingFloor(floor: IParkingFloor | null): string {
        return floor ? floor.number! : '';
    }

    onSubmit(): void {
        const parkingFloor: IParkingFloor =
            this.parkingSpotForm.get('parkingFloor')!.value!;

        const spot: IParkingSpot = new ParkingSpot(
            this.parkingSpotForm.get('number')!.value!,
            this.parkingSpotForm.get('description')!.value!,
            parkingFloor.id
        );

        const updatedSpot: IParkingSpot = new ParkingSpot(
            this.parkingSpotForm.get('number')!.value!,
            this.parkingSpotForm.get('description')!.value!,
            parkingFloor.id
        );

        if (this.isEditMode) {
            // Update spot
            this.parkingspotService
                .update(this.parkingSpotId!, updatedSpot)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/parking-spots']);
                    },
                    error: (error) => {
                        console.error('Error updating spot:', error);
                    },
                });
        } else {
            // Create new spot
            this.parkingspotService.create(spot).subscribe({
                next: () => {
                    this.router.navigate(['/parking-spots']);
                },
                error: (error) => {
                    console.error('Error creating spot:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
