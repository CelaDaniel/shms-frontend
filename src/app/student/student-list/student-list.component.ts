import { Component, OnInit } from '@angular/core';
import {
    StudentArrayResponseType,
    StudentResponseType,
    StudentService,
} from '../student.service';
import { IStudent } from '../student.model';
import { IData } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { Gender } from 'src/app/enums/gender-types.model';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
    students: IStudent[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'birthDate',
        'actions',
    ];

    filterFields: IFilter[] = [
        {
            name: 'number',
            label: 'Number',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            selectData: Object.values(Gender),
        },
        {
            name: 'deleted',
            label: 'Deleted',
            type: 'boolean',
        },
    ];

    constructor(protected studentService: StudentService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.studentService.getAll(filter).subscribe({
            next: (res: StudentArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IStudent> = res.body?.data!;
                this.students = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteStudent(student: IStudent): void {
        this.studentService.delete(student.id!).subscribe({
            next: (res: StudentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IStudent = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
