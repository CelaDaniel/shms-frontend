import { Component, OnInit } from '@angular/core';
import { BuildingResponseType, BuildingService } from '../building.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Building, IBuilding } from '../building.model';

@Component({
    selector: 'app-building-form',
    templateUrl: './building-form.component.html',
    styleUrls: ['./building-form.component.scss'],
})
export class BuildingFormComponent implements OnInit {
    buildingForm = this.fb.group({
        number: ['', [Validators.required]],
        description: [''],
        latitude: [0],
        longitude: [0],
        color: [''],
        nrFloors: [0],
        nrElevators: [0],
        nrParkingFloors: [0],
        nrApartmentsPerFloor: [0],
        nrParkingSpotsPerParkingFloor: [0],
    });
    isEditMode = false;
    buildingId?: number;
    constructor(
        protected buildingService: BuildingService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.buildingId = +params['id'];
                this.loadById(this.buildingId);
            }
        });
    }

    loadById(id: number): void {
        this.buildingService.getById(id).subscribe({
            next: (res: BuildingResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IBuilding = res.body?.data!;

                this.buildingForm.patchValue({
                    ...data,
                    nrFloors: data.floors?.length,
                    nrParkingFloors: data.parkingFloors?.length,
                    nrElevators: data.elevators?.length,
                });
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const building: IBuilding = new Building(
            this.buildingForm.get('number')!.value!,
            this.buildingForm.get('description')!.value!,
            this.buildingForm.get('latitude')!.value!,
            this.buildingForm.get('longitude')!.value!,
            this.buildingForm.get('color')!.value!,
            this.buildingForm.get('nrFloors')!.value!,
            this.buildingForm.get('nrElevators')!.value!,
            this.buildingForm.get('nrParkingFloors')!.value!,
            this.buildingForm.get('nrApartmentsPerFloor')!.value!,
            this.buildingForm.get('nrParkingSpotsPerParkingFloor')!.value!
        );

        const updatedBuilding: IBuilding = new Building(
            this.buildingForm.get('number')!.value!,
            this.buildingForm.get('description')!.value!,
            this.buildingForm.get('latitude')!.value!,
            this.buildingForm.get('longitude')!.value!,
            this.buildingForm.get('color')!.value!
        );

        if (this.isEditMode) {
            // Update building
            this.buildingService
                .update(this.buildingId!, updatedBuilding)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/buildings']);
                    },
                    error: (error) => {
                        console.error('Error updating building:', error);
                    },
                });
        } else {
            // Create new building
            this.buildingService.create(building).subscribe({
                next: () => {
                    this.router.navigate(['/buildings']);
                },
                error: (error) => {
                    console.error('Error creating building:', error);
                },
            });
        }
    }
}
