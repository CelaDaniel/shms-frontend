import { Component, OnInit } from '@angular/core';
import { ElevatorResponseType, ElevatorService } from '../elevator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Elevator, IElevator } from '../elevator.model';
import {
    BuildingArrayResponseType,
    BuildingService,
} from 'src/app/building/building.service';
import { IData } from 'src/app/core/response/response.model';
import { IBuilding } from 'src/app/building/building.model';

@Component({
    selector: 'app-elevator-form',
    templateUrl: './elevator-form.component.html',
    styleUrls: ['./elevator-form.component.scss'],
})
export class ElevatorFormComponent implements OnInit {
    buildings: IBuilding[] = [];
    elevatorForm: FormGroup;
    isEditMode = false;
    elevatorId?: number;
    constructor(
        protected elevatorService: ElevatorService,
        private buildingService: BuildingService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.elevatorForm = this.fb.group({
            number: ['', [Validators.required]],
            description: [''],
            buildingId: [null],
            capacity: [0],
            maxWeight: [0],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.elevatorId = +params['id'];
                this.loadById(this.elevatorId);
            }
        });
        this.loadData();
    }

    loadById(id: number): void {
        this.elevatorService.getById(id).subscribe({
            next: (res: ElevatorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IElevator = res.body?.data!;

                this.elevatorForm.patchValue({
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
        const elevator: IElevator = new Elevator(
            this.elevatorForm.get('number')!.value!,
            this.elevatorForm.get('description')!.value!,
            this.elevatorForm.get('buildingId')!.value!,
            this.elevatorForm.get('capacity')!.value!,
            this.elevatorForm.get('maxWeight')!.value!
        );

        const updatedElevator: IElevator = new Elevator(
            this.elevatorForm.get('number')!.value!,
            this.elevatorForm.get('description')!.value!,
            this.elevatorForm.get('buildingId')!.value!,
            this.elevatorForm.get('capacity')!.value!,
            this.elevatorForm.get('maxWeight')!.value!
        );

        if (this.isEditMode) {
            // Update elevator
            this.elevatorService
                .update(this.elevatorId!, updatedElevator)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/elevators']);
                    },
                    error: (error) => {
                        console.error('Error updating elevator:', error);
                    },
                });
        } else {
            // Create new elevator
            this.elevatorService.create(elevator).subscribe({
                next: () => {
                    this.router.navigate(['/elevators']);
                },
                error: (error) => {
                    console.error('Error creating elevator:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
