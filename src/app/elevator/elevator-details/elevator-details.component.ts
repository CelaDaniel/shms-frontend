import { Component, OnInit } from '@angular/core';
import { ElevatorResponseType, ElevatorService } from '../elevator.service';
import { ActivatedRoute } from '@angular/router';
import { IElevator } from '../elevator.model';

@Component({
    selector: 'app-elevator-details',
    templateUrl: './elevator-details.component.html',
    styleUrls: ['./elevator-details.component.scss'],
})
export class ElevatorDetailsComponent implements OnInit {
    elevator: IElevator | null = null;

    constructor(
        protected elevatorService: ElevatorService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.elevatorService.getById(id).subscribe({
            next: (res: ElevatorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IElevator = res.body?.data!;
                this.elevator = data;
                console.log(data);
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
