import { Component, OnInit } from '@angular/core';
import {
    FloorArrayResponseType,
    FloorResponseType,
    FloorService,
} from '../floor.service';
import { IFloor } from '../floor.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-floor-list',
    templateUrl: './floor-list.component.html',
    styleUrls: ['./floor-list.component.scss'],
})
export class FloorListComponent implements OnInit {
    floors: IFloor[] = [];
    displayedColumns: string[] = ['id', 'number', 'apartmentNo', 'actions'];

    constructor(protected floorService: FloorService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.floorService.getAll().subscribe({
            next: (res: FloorArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IFloor> = res.body?.data!;
                this.floors = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteFloor(floor: IFloor): void {
        this.floorService.delete(floor.id!).subscribe({
            next: (res: FloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IFloor = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
