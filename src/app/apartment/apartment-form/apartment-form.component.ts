import { Component, OnInit } from '@angular/core';
import { ApartmentResponseType, ApartmentService } from '../apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Apartment, IApartment } from '../apartment.model';
import { ApartmentTypes } from 'src/app/enums/apartment-types.model';

@Component({
    selector: 'app-apartment-form',
    templateUrl: './apartment-form.component.html',
    styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
    apartmentTypes = Object.values(ApartmentTypes);

    apartmentForm = this.fb.group({
        number: ['', [Validators.required]],
        description: [''],
        area: [0],
        apartmentType: [this.apartmentTypes[0], [Validators.required]],
        balconyNr: [0],
        windowNr: [0],
        toiletsNr: [0],
        capacity: [0],
        hasKitchen: [false],
        floorId: [0],
    });

    isEditMode = false;
    apartmentId?: number;
    constructor(
        protected apartmentService: ApartmentService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.apartmentId = +params['id'];
                this.loadById(this.apartmentId);
            }
        });
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
            this.apartmentForm.get('hasKitchen')!.value!
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
}
