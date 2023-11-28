import { Component, OnInit } from '@angular/core';
import {
    StudentArrayResponseType,
    StudentResponseType,
    StudentService,
} from '../student.service';
import { IStudent } from '../student.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { Gender } from 'src/app/enums/gender-types.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';
import { UserRoles } from 'src/app/enums/roles.model';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
    userRoles = UserRoles;
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
            name: 'firstName',
            label: 'First name',
            type: 'text',
        },
        {
            name: 'lastName',
            label: 'Last name',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'phoneNumber',
            label: 'Phone number',
            type: 'text',
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            selectData: Object.values(Gender),
        },
        {
            name: 'birthDate',
            label: 'Birth date',
            type: 'date',
        },
        {
            name: 'deleted',
            label: 'Deleted',
            type: 'boolean',
        },
    ];

    filter?: { [key: string]: string };

    totalElements = 0;
    pageSize = PAGE_SIZE;
    page = 0;
    pageSizeOptions = PAGE_SIZE_OPTIONS;
    sortDirection?: string;
    sortColumn?: string;
    opened = false;
    studentId?: number;

    constructor(protected studentService: StudentService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.studentService
            .query({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: StudentArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IStudent> = res.body?.data!;
                    this.students = data.content ?? [];
                    const pageable: IPagination = data.pageable;
                    this.page = pageable.pageNumber;
                    this.pageSize = pageable.pageSize;
                    this.totalElements = pageable.totalElements;
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
    }

    handlePagination(paginationData: {
        pageIndex: number;
        pageSize: number;
    }): void {
        this.page = paginationData.pageIndex;
        this.pageSize = paginationData.pageSize;
        this.loadAll(this.filter);
    }

    sortChange(sortState: Sort) {
        this.sortColumn = sortState.active;
        this.sortDirection = sortState.direction.toUpperCase();
        this.loadAll(this.filter);
    }

    openModal(id: number): void {
        this.studentId = id;
        this.opened = true;
    }

    closeModal(): void {
        this.opened = false;
    }

    deleteStudent(): void {
        this.studentService.delete(this.studentId!).subscribe({
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
        this.closeModal();
    }
}
