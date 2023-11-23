import { Component, OnInit } from '@angular/core';
import {
    ParkingSpotResponseType,
    ParkingSpotService,
} from '../parking-spot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ParkingSpot, IParkingSpot } from '../parking-spot.model';

@Component({
    selector: 'app-parking-spot-form',
    templateUrl: './parking-spot-form.component.html',
    styleUrls: ['./parking-spot-form.component.scss'],
})
export class ParkingSpotFormComponent implements OnInit {
    parkingSpotForm = this.fb.group({
        number: ['', [Validators.required]],
        description: [''],
        parkingFloorId: [0],
    });
    isEditMode = false;
    parkingSpotId?: number;
    constructor(
        protected parkingspotService: ParkingSpotService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.parkingSpotId = +params['id'];
                this.loadById(this.parkingSpotId);
            }
        });
    }

    loadById(id: number): void {
        this.parkingspotService.getById(id).subscribe({
            next: (res: ParkingSpotResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingSpot = res.body?.data!;

                this.parkingSpotForm.patchValue({
                    ...data,
                    parkingFloorId: data.parkingFloor?.id,
                });
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const spot: IParkingSpot = new ParkingSpot(
            this.parkingSpotForm.get('number')!.value!,
            this.parkingSpotForm.get('description')!.value!,
            this.parkingSpotForm.get('buildingId')!.value!
        );

        const updatedSpot: IParkingSpot = new ParkingSpot(
            this.parkingSpotForm.get('number')!.value!,
            this.parkingSpotForm.get('description')!.value!,
            this.parkingSpotForm.get('buildingId')!.value!
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
