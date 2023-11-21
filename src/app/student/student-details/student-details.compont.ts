import { Component, OnInit } from '@angular/core';
import { IStudent } from '../student.model';
import { StudentResponseType, StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
    student: IStudent | null = null;

    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = +params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.studentService.getById(id).subscribe({
            next: (res: StudentResponseType) => {
                const data: IStudent = res.body?.data!;
                this.student = data;
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
