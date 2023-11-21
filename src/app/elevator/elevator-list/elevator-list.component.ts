import { Component, OnInit } from '@angular/core';
import {
    ElevatorArrayResponseType,
    ElevatorResponseType,
    ElevatorService,
} from '../elevator.service';
import { IElevator } from '../elevator.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-elevator-list',
    templateUrl: './elevator-list.component.html',
    styleUrls: ['./elevator-list.component.scss'],
})
export class ElevatorListComponent implements OnInit {
    elevators: IElevator[] = [];
    displayedColumns: string[] = [
        'id',
        'number',
        'capacity',
        'maxWeight',
        'actions',
    ];

    constructor(protected elevatorService: ElevatorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.elevatorService.getAll().subscribe({
            next: (res: ElevatorArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IElevator> = res.body?.data!;
                this.elevators = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteElevator(elevator: IElevator): void {
        this.elevatorService.delete(elevator.id!).subscribe({
            next: (res: ElevatorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IElevator = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
