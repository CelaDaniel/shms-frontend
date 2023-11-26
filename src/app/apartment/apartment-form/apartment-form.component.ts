import { Component, OnInit } from '@angular/core';
import {
    ApartmentArrayResponseType,
    ApartmentResponseType,
    ApartmentService,
} from '../apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apartment, IApartment } from '../apartment.model';
import { ApartmentTypes } from 'src/app/enums/apartment-types.model';
import { IFloor } from 'src/app/floor/floor.model';
import { FloorService } from 'src/app/floor/floor.service';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-apartment-form',
    templateUrl: './apartment-form.component.html',
    styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
    apartmentTypes = Object.values(ApartmentTypes);
    floors: IFloor[] = [];

    apartmentForm: FormGroup;

    isEditMode = false;
    apartmentId?: number;
    constructor(
        protected apartmentService: ApartmentService,
        private floorService: FloorService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.apartmentForm = this.fb.group({
            number: ['', [Validators.required]],
            description: [''],
            area: [null, [Validators.required]],
            apartmentType: [this.apartmentTypes[0], [Validators.required]],
            balconyNr: [0],
            windowNr: [0],
            toiletsNr: [0],
            capacity: [null, [Validators.required, Validators.min(1)]],
            hasKitchen: [false],
            floorId: [null],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.apartmentId = +params['id'];
                this.loadById(this.apartmentId);
            }
        });
        this.loadData();
    }

    loadById(id: number): void {
        this.apartmentService.getById(id).subscribe({
            next: (res: ApartmentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IApartment = res.body?.data!;
                console.log(data);

                this.apartmentForm.patchValue({
                    ...data,
                    floorId: data.floor?.id,
                });
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    loadData(): void {
        this.apartmentService.getAll().subscribe({
            next: (res: ApartmentArrayResponseType) => {
                const data: IData<IFloor> = res.body?.data!;
                this.floors = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const apartment: IApartment = new Apartment(
            this.apartmentForm.get('number')!.value!,
            this.apartmentForm.get('description')!.value!,
            this.apartmentForm.get('area')!.value!,
            this.apartmentForm.get('apartmentType')!.value!,
            this.apartmentForm.get('balconyNr')!.value!,
            this.apartmentForm.get('windowNr')!.value!,
            this.apartmentForm.get('toiletsNr')!.value!,
            this.apartmentForm.get('capacity')!.value!,
            this.apartmentForm.get('hasKitchen')!.value!,
            this.apartmentForm.get('floorId')!.value
        );

        const updatedApartment: IApartment = new Apartment(
            this.apartmentForm.get('number')!.value!,
            this.apartmentForm.get('description')!.value!,
            this.apartmentForm.get('area')!.value!,
            this.apartmentForm.get('apartmentType')!.value!,
            this.apartmentForm.get('balconyNr')!.value!,
            this.apartmentForm.get('windowNr')!.value!,
            this.apartmentForm.get('toiletsNr')!.value!,
            this.apartmentForm.get('capacity')!.value!,
            this.apartmentForm.get('hasKitchen')!.value!,
            this.apartmentForm.get('floorId')!.value!
        );

        if (this.isEditMode) {
            // Update apartment
            this.apartmentService
                .update(this.apartmentId!, updatedApartment)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/apartments']);
                    },
                    error: (error) => {
                        console.error('Error updating apartment:', error);
                    },
                });
        } else {
            // Create new apartment
            this.apartmentService.create(apartment).subscribe({
                next: () => {
                    this.router.navigate(['/apartments']);
                },
                error: (error) => {
                    console.error('Error creating apartment:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
