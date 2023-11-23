import { Component, OnInit } from '@angular/core';
import { FloorResponseType, FloorService } from '../floor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Floor, IFloor } from '../floor.model';

@Component({
    selector: 'app-floor-form',
    templateUrl: './floor-form.component.html',
    styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent implements OnInit {
    floorForm = this.fb.group({
        number: ['', [Validators.required]],
        description: [''],
        buildingId: [0],
    });
    isEditMode = false;
    floorId?: number;
    constructor(
        protected floorService: FloorService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.floorId = +params['id'];
                this.loadById(this.floorId);
            }
        });
    }

    loadById(id: number): void {
        this.floorService.getById(id).subscribe({
            next: (res: FloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IFloor = res.body?.data!;

                this.floorForm.patchValue({
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
        const floor: IFloor = new Floor(
            this.floorForm.get('number')!.value!,
            this.floorForm.get('description')!.value!,
            this.floorForm.get('buildingId')!.value!
        );

        const updatedFloor: IFloor = new Floor(
            this.floorForm.get('number')!.value!,
            this.floorForm.get('description')!.value!,
            this.floorForm.get('buildingId')!.value!
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
