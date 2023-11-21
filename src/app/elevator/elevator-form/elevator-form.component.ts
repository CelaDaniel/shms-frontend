import { Component, OnInit } from '@angular/core';
import { ElevatorResponseType, ElevatorService } from '../elevator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Elevator, IElevator } from '../elevator.model';

@Component({
    selector: 'app-elevator-form',
    templateUrl: './elevator-form.component.html',
    styleUrls: ['./elevator-form.component.scss'],
})
export class ElevatorFormComponent implements OnInit {
    elevatorForm = this.fb.group({
        number: ['', [Validators.required]],
        description: [''],
        buildingId: [0],
        capacity: [0],
        maxWeight: [0],
    });
    isEditMode = false;
    elevatorId?: number;
    constructor(
        protected elevatorService: ElevatorService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.elevatorId = +params['id'];
                this.loadById(this.elevatorId);
            }
        });
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
}
