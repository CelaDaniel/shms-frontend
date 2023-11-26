import { Component, OnInit } from '@angular/core';
import {
    ParkingFloorResponseType,
    ParkingFloorService,
} from '../parking-floor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingFloor, IParkingFloor } from '../parking-floor.model';
import {
    BuildingArrayResponseType,
    BuildingService,
} from 'src/app/building/building.service';
import { IBuilding } from 'src/app/building/building.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-parking-floor-form',
    templateUrl: './parking-floor-form.component.html',
    styleUrls: ['./parking-floor-form.component.scss'],
})
export class ParkingFloorFormComponent implements OnInit {
    buildings: IBuilding[] = [];
    parkingFloorForm: FormGroup;
    isEditMode = false;
    parkingFloorId?: number;
    constructor(
        protected parkingfloorService: ParkingFloorService,
        private buildingService: BuildingService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.parkingFloorForm = this.fb.group({
            number: ['', [Validators.required]],
            description: [''],
            buildingId: [null],
            nrParkingSpots: [0],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.parkingFloorId = +params['id'];
                this.loadById(this.parkingFloorId);
            }
        });
        this.loadData();
    }

    loadById(id: number): void {
        this.parkingfloorService.getById(id).subscribe({
            next: (res: ParkingFloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IParkingFloor = res.body?.data!;

                this.parkingFloorForm.patchValue({
                    ...data,
                    buildingId: data.building?.id,
                });
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    loadData(): void {
        this.buildingService.getAll().subscribe({
            next: (res: BuildingArrayResponseType) => {
                const data: IData<IBuilding> = res.body?.data!;
                this.buildings = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const floor: IParkingFloor = new ParkingFloor(
            this.parkingFloorForm.get('number')!.value!,
            this.parkingFloorForm.get('description')!.value!,
            this.parkingFloorForm.get('buildingId')!.value!,
            this.parkingFloorForm.get('nrParkingSpots')!.value
        );

        const updatedFloor: IParkingFloor = new ParkingFloor(
            this.parkingFloorForm.get('number')!.value!,
            this.parkingFloorForm.get('description')!.value!,
            this.parkingFloorForm.get('buildingId')!.value!
        );

        if (this.isEditMode) {
            // Update floor
            this.parkingfloorService
                .update(this.parkingFloorId!, updatedFloor)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/parking-floors']);
                    },
                    error: (error) => {
                        console.error('Error updating floor:', error);
                    },
                });
        } else {
            // Create new floor
            this.parkingfloorService.create(floor).subscribe({
                next: () => {
                    this.router.navigate(['/parking-floors']);
                },
                error: (error) => {
                    console.error('Error creating floor:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
