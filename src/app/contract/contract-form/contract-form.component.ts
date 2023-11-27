import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractResponseType, ContractService } from '../contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract, IContract } from '../contract.model';
import * as dayjs from 'dayjs';
import { IApartment } from 'src/app/apartment/apartment.model';
import { IStudent } from 'src/app/student/student.model';
import { IParkingSpot } from 'src/app/parking-spot/parking-spot.model';
import {
    ApartmentArrayResponseType,
    ApartmentService,
} from 'src/app/apartment/apartment.service';
import {
    ParkingSpotArrayResponseType,
    ParkingSpotService,
} from 'src/app/parking-spot/parking-spot.service';
import {
    StudentArrayResponseType,
    StudentService,
} from 'src/app/student/student.service';
import { IData } from 'src/app/core/response/response.model';

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

    constructor(
        protected contractService: ContractService,
        protected apartmentService: ApartmentService,
        protected parkingSpotService: ParkingSpotService,
        protected studentService: StudentService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.contractForm = this.fb.group({
            number: ['', [Validators.required]],
            initialValidDate: [new Date(), [Validators.required]],
            endValidDate: [new Date(), [Validators.required]],
            fee: ['', [Validators.required]],
            signDate: [new Date(), [Validators.required]],
            apartmentId: [null, [Validators.required]],
            parkingSpotId: [null, [Validators.required]],
            studentId: [null, [Validators.required]],
            description: [''],
            file: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadData();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.contractId = +params['id'];
                this.contractForm.get('file')!.clearValidators();
                this.contractForm.get('file')!.updateValueAndValidity();
                this.loadFile(this.contractId);
                this.loadById(this.contractId);
            }
        });
    }

    loadById(id: number): void {
        this.contractService.getById(id).subscribe({
            next: (res: ContractResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IContract = res.body?.data!;

                this.contractForm.patchValue({
                    ...data,
                    apartmentId: data.apartment?.id,
                    studentId: data.student?.id,
                    parkingSpotId: data.parkingSpot?.id,
                });
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
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

    loadData(): void {
        this.apartmentService.query().subscribe({
            next: (res: ApartmentArrayResponseType) => {
                const data: IData<IApartment> = res.body?.data!;
                this.apartments = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });

        this.parkingSpotService.query().subscribe({
            next: (res: ParkingSpotArrayResponseType) => {
                const data: IData<IParkingSpot> = res.body?.data!;
                this.parkingSpots = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });

        this.studentService.query().subscribe({
            next: (res: StudentArrayResponseType) => {
                const data: IData<IStudent> = res.body?.data!;
                this.students = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
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
        contract.append(
            'apartmentId',
            this.contractForm.get('apartmentId')!.value!
        );
        contract.append(
            'parkingSpotId',
            this.contractForm.get('parkingSpotId')!.value!
        );
        contract.append(
            'studentId',
            this.contractForm.get('studentId')!.value!
        );
        contract.append(
            'description',
            this.contractForm.get('description')!.value!
        );
        if (this.contractForm.get('file')!.value! !== null) {
            contract.append('file', this.contractForm.get('file')!.value!);
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
