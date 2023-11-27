import { Component, OnInit } from '@angular/core';
import { FloorResponseType, FloorService } from '../floor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Floor, IFloor } from '../floor.model';
import {
    BuildingListResponseType,
    BuildingService,
} from 'src/app/building/building.service';
import { IBuilding } from 'src/app/building/building.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-floor-form',
    templateUrl: './floor-form.component.html',
    styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent implements OnInit {
    buildings: IBuilding[] = [];
    floorForm: FormGroup;
    isEditMode = false;
    floorId?: number;

    filteredBuildings?: Observable<IBuilding[]>;

    constructor(
        protected floorService: FloorService,
        private buildingService: BuildingService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.floorForm = this.fb.group({
            number: ['', [Validators.required]],
            description: [''],
            building: [null, [Validators.required]],
            nrApartments: [0],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.floorId = +params['id'];
                this.loadById(this.floorId);
            }
        });
        this.loadData();
    }

    loadById(id: number): void {
        this.floorService.getById(id).subscribe({
            next: (res: FloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IFloor = res.body?.data!;

                this.floorForm.patchValue(data);
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
                this.filteredBuildings = this.floorForm
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
        const building: IBuilding = this.floorForm.get('building')!.value!;

        const floor: IFloor = new Floor(
            this.floorForm.get('number')!.value!,
            this.floorForm.get('description')!.value!,
            building.id,
            this.floorForm.get('nrApartments')!.value!
        );

        const updatedFloor: IFloor = new Floor(
            this.floorForm.get('number')!.value!,
            this.floorForm.get('description')!.value!,
            building.id
        );

        if (this.isEditMode) {
            // Update floor
            this.floorService.update(this.floorId!, updatedFloor).subscribe({
                next: () => {
                    this.router.navigate(['/floors']);
                },
                error: (error) => {
                    console.error('Error updating floor:', error);
                },
            });
        } else {
            // Create new floor
            this.floorService.create(floor).subscribe({
                next: () => {
                    this.router.navigate(['/floors']);
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
