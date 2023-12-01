import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractResponseType, ContractService } from '../contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContract } from '../contract.model';
import * as dayjs from 'dayjs';
import { IApartment } from 'src/app/apartment/apartment.model';
import { IStudent } from 'src/app/student/student.model';
import { IParkingSpot } from 'src/app/parking-spot/parking-spot.model';
import {
    ApartmentListResponseType,
    ApartmentService,
} from 'src/app/apartment/apartment.service';
import {
    ParkingSpotListResponseType,
    ParkingSpotService,
} from 'src/app/parking-spot/parking-spot.service';
import {
    StudentListResponseType,
    StudentService,
} from 'src/app/student/student.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
    apartmentOrParkingSpotRequired,
    discountMaxValue,
    maxFileSize,
} from './contract-form-validator';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent {
    contractForm: FormGroup;
    isEditMode = false;
    hasFile = false;
    fileUrl?: string;
    contractId?: number;

    apartments: IApartment[] = [];
    students: IStudent[] = [];
    parkingSpots: IParkingSpot[] = [];

    filteredApartments?: Observable<IApartment[]>;
    filteredParkingSpots?: Observable<IParkingSpot[]>;
    filteredStudents?: Observable<IStudent[]>;

    apartmentPercentage = false;
    parkingSpotPercentage = false;

    currentContract: IContract | null = null;

    constructor(
        protected contractService: ContractService,
        protected apartmentService: ApartmentService,
        protected parkingSpotService: ParkingSpotService,
        protected studentService: StudentService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.contractForm = this.fb.group(
            {
                number: ['', [Validators.required]],
                initialValidDate: [new Date(), [Validators.required]],
                endValidDate: [new Date(), [Validators.required]],
                fee: [0, [Validators.required, Validators.min(0)]],
                signDate: [new Date(), [Validators.required]],
                apartment: [null],
                parkingSpot: [null],
                student: [null, [Validators.required]],
                description: [''],
                file: [null, [Validators.required]],
                apartmentFee: [0],
                parkingSpotFee: [0],
                apartmentDiscount: [0, [Validators.min(0)]],
                parkingSpotDiscount: [0, [Validators.min(0)]],
                apartmentPercentage: [false],
                parkingSpotPercentage: [false],
            },
            {
                validators: [
                    apartmentOrParkingSpotRequired,
                    discountMaxValue,
                    maxFileSize,
                ],
            }
        );
    }

    ngOnInit(): void {
        this.onDateChanges();

        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.contractId = +params['id'];
                this.contractForm.get('file')!.clearValidators();
                this.contractForm.get('file')!.updateValueAndValidity();
                this.loadFile(this.contractId);
                this.loadById(this.contractId);
            } else {
                this.contractForm.get('apartment')!.disable();
                this.contractForm.get('parkingSpot')!.disable();
                this.contractForm.get('student')!.disable();
            }
        });
    }

    loadById(id: number): void {
        this.contractService.getById(id).subscribe({
            next: (res: ContractResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IContract = res.body?.data!;
                this.currentContract = data;
                this.apartmentPercentage = data.apartmentPercentage!;
                this.parkingSpotPercentage = data.parkingSpotPercentage!;
                this.contractForm.patchValue(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    calculateTotalFee(): number {
        const apartmentFee = Number(
            this.contractForm.get('apartmentFee')!.value!
        );
        const parkingSpotFee = Number(
            this.contractForm.get('parkingSpotFee')!.value!
        );

        const apartmentDiscountValue = Number(
            this.contractForm.get('apartmentDiscount')!.value!
        );
        const parkingSpotDiscountValue = Number(
            this.contractForm.get('parkingSpotDiscount')!.value!
        );

        const apartmentDiscount = this.apartmentPercentage
            ? apartmentFee * (apartmentDiscountValue / 100)
            : apartmentDiscountValue;
        const parkingSpotDiscount = this.parkingSpotPercentage
            ? parkingSpotFee * (parkingSpotDiscountValue / 100)
            : parkingSpotDiscountValue;

        const totalFee =
            apartmentFee -
            apartmentDiscount +
            (parkingSpotFee - parkingSpotDiscount);

        this.contractForm.get('fee')!.setValue(totalFee);
        return totalFee;
    }

    toggleApartmentPercentage(): void {
        this.apartmentPercentage = !this.apartmentPercentage;
        this.contractForm
            .get('apartmentPercentage')!
            .setValue(this.apartmentPercentage);
    }

    toggleParkingSpotPercentage(): void {
        this.parkingSpotPercentage = !this.parkingSpotPercentage;
        this.contractForm
            .get('parkingSpotPercentage')!
            .setValue(this.parkingSpotPercentage);
    }

    apartmentInputChanged(e: Event): void {
        const apartment = (e.target as HTMLInputElement).value;
        if (!apartment) {
            this.contractForm.get('apartmentFee')!.setValue(0);
        }
    }

    parkingSpotInputChanged(e: Event): void {
        const parkingSpot = (e.target as HTMLInputElement).value;
        if (!parkingSpot) {
            this.contractForm.get('parkingSpotFee')!.setValue(0);
        }
    }

    apartmentChanged(e: MatAutocompleteSelectedEvent): void {
        const apartment: IApartment = e.option.value;

        if (apartment instanceof Object) {
            if (apartment.id !== this.currentContract?.apartment?.id) {
                this.contractForm
                    .get('apartmentFee')!
                    .setValue(Number(apartment.price!));
            } else {
                this.contractForm
                    .get('apartmentFee')!
                    .setValue(Number(this.currentContract?.apartmentFee));
            }
        } else {
            this.contractForm.get('apartmentFee')!.setValue(0);
        }
    }

    parkingSpotChanged(e: MatAutocompleteSelectedEvent): void {
        const parkingSpot: IParkingSpot = e.option.value;
        if (parkingSpot instanceof Object) {
            if (parkingSpot.id !== this.currentContract?.parkingSpot?.id) {
                this.contractForm
                    .get('parkingSpotFee')!
                    .setValue(Number(parkingSpot.price!));
            } else {
                this.contractForm
                    .get('parkingSpotFee')!
                    .setValue(Number(this.currentContract?.parkingSpotFee));
            }
        } else {
            this.contractForm.get('parkingSpotFee')!.setValue(0);
        }
    }

    private onDateChanges(): void {
        this.contractForm
            .get('initialValidDate')!
            .valueChanges.subscribe(() => {
                this.loadData();
                if (
                    this.contractForm.get('apartment')!.disabled ||
                    this.contractForm.get('parkingSpot')!.disabled ||
                    this.contractForm.get('student')!.disabled
                ) {
                    this.contractForm.get('apartment')!.enable();
                    this.contractForm.get('parkingSpot')!.enable();
                    this.contractForm.get('student')!.enable();
                }
            });

        this.contractForm.get('endValidDate')!.valueChanges.subscribe(() => {
            this.loadData();
            if (
                this.contractForm.get('apartment')!.disabled ||
                this.contractForm.get('parkingSpot')!.disabled ||
                this.contractForm.get('student')!.disabled
            ) {
                this.contractForm.get('apartment')!.enable();
                this.contractForm.get('parkingSpot')!.enable();
                this.contractForm.get('student')!.enable();
            }
        });
    }

    loadData(): void {
        const startDate: Date =
            this.contractForm.get('initialValidDate')!.value!;
        const endDate: Date = this.contractForm.get('endValidDate')!.value!;

        const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

        this.apartmentService
            .getAvailable({
                initialValidDate: formattedStartDate,
                endValidDate: formattedEndDate,
                contractId: this.contractId,
            })
            .subscribe({
                next: (res: ApartmentListResponseType) => {
                    const data: IApartment[] = res.body?.data ?? [];
                    this.apartments = data;
                    this.filteredApartments = this.contractForm
                        .get('apartment')!
                        .valueChanges.pipe(
                            startWith(''),
                            map((value) => this._filterApartments(value))
                        );
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });

        this.parkingSpotService
            .getAvailable({
                initialValidDate: formattedStartDate,
                endValidDate: formattedEndDate,
                contractId: this.contractId,
            })
            .subscribe({
                next: (res: ParkingSpotListResponseType) => {
                    const data: IParkingSpot[] = res.body?.data ?? [];
                    this.parkingSpots = data;
                    this.filteredParkingSpots = this.contractForm
                        .get('parkingSpot')!
                        .valueChanges.pipe(
                            startWith(''),
                            map((value) => this._filterParkingSpots(value))
                        );
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });

        this.studentService
            .getAvailable({
                initialValidDate: formattedStartDate,
                endValidDate: formattedEndDate,
                contractId: this.contractId,
            })
            .subscribe({
                next: (res: StudentListResponseType) => {
                    const data: IStudent[] = res.body?.data ?? [];
                    this.students = data;
                    this.filteredStudents = this.contractForm
                        .get('student')!
                        .valueChanges.pipe(
                            startWith(''),
                            map((value) => this._filterStudents(value))
                        );
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
    }

    private _filterApartments(value: string | IApartment): IApartment[] {
        const filterValue =
            value && typeof value === 'string' ? value.toLowerCase() : '';

        return this.apartments.filter((apartment) =>
            apartment?.number?.toLowerCase().includes(filterValue)
        );
    }

    private _filterParkingSpots(value: string | IParkingSpot): IParkingSpot[] {
        const filterValue =
            value && typeof value === 'string' ? value.toLowerCase() : '';

        return this.parkingSpots.filter((parkingSpot) =>
            parkingSpot?.number?.toLowerCase().includes(filterValue)
        );
    }

    private _filterStudents(value: string | IStudent): IStudent[] {
        const filterValue =
            value && typeof value === 'string' ? value.toLowerCase() : '';

        return this.students.filter(
            (student) =>
                student?.firstName?.toLowerCase().includes(filterValue) ||
                student?.lastName?.toLowerCase().includes(filterValue) ||
                student?.number?.toLowerCase().includes(filterValue)
        );
    }

    displayApartment(apartment: IApartment | null): string {
        return apartment ? apartment.number! : '';
    }

    displayParkingSpot(parkingSpot: IParkingSpot | null): string {
        return parkingSpot ? parkingSpot.number! : '';
    }

    displayStudent(student: IStudent | null): string {
        return student
            ? `${student.firstName} ${student.lastName} (${student.number})`
            : '';
    }

    loadFile(id: number): void {
        this.contractService.getFile(this.contractId!).subscribe({
            next: (res) => {
                if (res) {
                    this.hasFile = true;
                    this.fileUrl = window.URL.createObjectURL(res);
                }
            },
            error: (res) => {
                console.log(res.body);
            },
        });
    }

    viewFile(): void {
        window.open(this.fileUrl);
    }

    onFileChange(event: any): void {
        const file: File = (event.target as HTMLInputElement).files?.[0]!;

        if (file) {
            this.contractForm.controls['file'].setValue(file);
        }
    }

    onSubmit(): void {
        const startDate: Date =
            this.contractForm.get('initialValidDate')!.value!;
        const endDate: Date = this.contractForm.get('endValidDate')!.value!;
        const signDate: Date = this.contractForm.get('signDate')!.value!;

        const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
        const formattedSignDate = dayjs(signDate).format('YYYY-MM-DD');

        const apartment: IApartment =
            this.contractForm.get('apartment')!.value!;
        const parkingSpot: IParkingSpot =
            this.contractForm.get('parkingSpot')!.value!;
        const student: IStudent = this.contractForm.get('student')!.value!;

        // const contract: IContract = new Contract(
        //     this.contractForm.get('number')!.value!,
        //     formattedStartDate,
        //     formattedEndDate,
        //     this.contractForm.get('fee')!.value!,
        //     formattedSignDate,
        //     this.contractForm.get('apartmentId')!.value!,
        //     this.contractForm.get('parkingSpotId')!.value!,
        //     this.contractForm.get('studentId')!.value!,
        //     this.contractForm.get('description')!.value!,
        //     this.contractForm.get('file')!.value!
        // );

        const contract = new FormData();
        contract.append('number', this.contractForm.get('number')!.value!);
        contract.append('initialValidDate', formattedStartDate);
        contract.append('endValidDate', formattedEndDate);
        contract.append('fee', this.contractForm.get('fee')!.value!);
        contract.append('signDate', formattedSignDate);
        apartment && contract.append('apartmentId', apartment.id!.toString());
        parkingSpot &&
            contract.append('parkingSpotId', parkingSpot.id!.toString());
        contract.append('studentId', student.id!.toString());
        contract.append(
            'description',
            this.contractForm.get('description')!.value!
        );
        if (this.contractForm.get('file')!.value! !== null) {
            contract.append('file', this.contractForm.get('file')!.value!);
        }
        if (this.contractForm.get('apartmentFee')!.value! > 0) {
            contract.append(
                'apartmentFee',
                this.contractForm.get('apartmentFee')!.value!
            );
        }

        if (this.contractForm.get('parkingSpotFee')!.value! > 0) {
            contract.append(
                'parkingSpotFee',
                this.contractForm.get('parkingSpotFee')!.value!
            );
        }

        if (this.contractForm.get('apartmentDiscount')!.value! > 0) {
            contract.append(
                'apartmentDiscount',
                this.contractForm.get('apartmentDiscount')!.value!
            );
            contract.append(
                'apartmentPercentage',
                this.contractForm.get('apartmentPercentage')!.value!
            );
        }

        if (this.contractForm.get('parkingSpotDiscount')!.value! > 0) {
            contract.append(
                'parkingSpotDiscount',
                this.contractForm.get('parkingSpotDiscount')!.value!
            );
            contract.append(
                'parkingSpotPercentage',
                this.contractForm.get('parkingSpotPercentage')!.value!
            );
        }

        if (this.isEditMode) {
            // Update contract
            this.contractService.update(this.contractId!, contract).subscribe({
                next: () => {
                    this.router.navigate(['/contracts']);
                },
                error: (error) => {
                    console.error('Error updating contract:', error);
                },
            });
        } else {
            // Create new contract
            this.contractService.create(contract).subscribe({
                next: () => {
                    this.router.navigate(['/contracts']);
                },
                error: (error) => {
                    console.error('Error creating contract:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
