import { Component, OnInit } from '@angular/core';
import { ElevatorResponseType, ElevatorService } from '../elevator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Elevator, IElevator } from '../elevator.model';
import {
    BuildingListResponseType,
    BuildingService,
} from 'src/app/building/building.service';
import { IBuilding } from 'src/app/building/building.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

    filteredBuildings?: Observable<IBuilding[]>;

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
            building: [null, [Validators.required]],
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

                this.elevatorForm.patchValue(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    loadData(): void {
        this.buildingService.getAll().subscribe({
            next: (res: BuildingListResponseType) => {
                const data: IBuilding[] = res.body?.data ?? [];
                this.buildings = data;
                this.filteredBuildings = this.elevatorForm
                    .get('building')!
                    .valueChanges.pipe(
                        startWith(''),
                        map((value) => this._filterBuildings(value))
                    );
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    private _filterBuildings(value: string | IBuilding): IBuilding[] {
        const filterValue =
            value && typeof value === 'string' ? value.toLowerCase() : '';

        return this.buildings.filter((building) =>
            building?.number?.toLowerCase().includes(filterValue)
        );
    }

    displayBuilding(building: IBuilding | null): string {
        return building ? building.number! : '';
    }

    onSubmit(): void {
        const building: IBuilding = this.elevatorForm.get('building')!.value!;

        const elevator: IElevator = new Elevator(
            this.elevatorForm.get('number')!.value!,
            this.elevatorForm.get('description')!.value!,
            building.id,
            this.elevatorForm.get('capacity')!.value!,
            this.elevatorForm.get('maxWeight')!.value!
        );

        const updatedElevator: IElevator = new Elevator(
            this.elevatorForm.get('number')!.value!,
            this.elevatorForm.get('description')!.value!,
            building.id,
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
