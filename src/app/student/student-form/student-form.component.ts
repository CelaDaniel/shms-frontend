import { Component, OnInit } from '@angular/core';
import { StudentResponseType, StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, IStudent } from '../student.model';
import { Gender } from 'src/app/enums/gender-types.model';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
    genders = Object.values(Gender);
    studentForm: FormGroup;
    isEditMode = false;
    studentId?: number;
    constructor(
        protected studentService: StudentService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.studentForm = this.fb.group({
            number: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required]],
            birthDate: [new Date(), [Validators.required]],
            gender: [Gender.FEMALE],
            description: [''],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.studentId = +params['id'];
                this.loadById(this.studentId);
            }
        });
    }

    loadById(id: number): void {
        this.studentService.getById(id).subscribe({
            next: (res: StudentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IStudent = res.body?.data!;

                this.studentForm.patchValue(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const date: Date = this.studentForm.get('birthDate')!.value!;
        date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
        const student: IStudent = new Student(
            this.studentForm.get('number')!.value!,
            this.studentForm.get('firstName')!.value!,
            this.studentForm.get('lastName')!.value!,
            this.studentForm.get('email')!.value!,
            this.studentForm.get('phoneNumber')!.value!,
            date,
            this.studentForm.get('gender')!.value!,
            this.studentForm.get('description')!.value!
        );

        const updatedStudent: IStudent = new Student(
            this.studentForm.get('number')!.value!,
            this.studentForm.get('firstName')!.value!,
            this.studentForm.get('lastName')!.value!,
            this.studentForm.get('email')!.value!,
            this.studentForm.get('phoneNumber')!.value!,
            date,
            this.studentForm.get('gender')!.value!,
            this.studentForm.get('description')!.value!
        );

        if (this.isEditMode) {
            // Update student
            this.studentService
                .update(this.studentId!, updatedStudent)
                .subscribe({
                    next: () => {
                        this.router.navigate(['/students']);
                    },
                    error: (error) => {
                        console.error('Error updating student:', error);
                    },
                });
        } else {
            // Create new student
            this.studentService.create(student).subscribe({
                next: () => {
                    this.router.navigate(['/students']);
                },
                error: (error) => {
                    console.error('Error creating student:', error);
                },
            });
        }
    }
}
