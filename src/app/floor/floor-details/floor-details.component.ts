import { Component, OnInit } from '@angular/core';
import { FloorResponseType, FloorService } from '../floor.service';
import { ActivatedRoute } from '@angular/router';
import { IFloor } from '../floor.model';

@Component({
    selector: 'app-floor-details',
    templateUrl: './floor-details.component.html',
    styleUrls: ['./floor-details.component.scss'],
})
export class FloorDetailsComponent implements OnInit {
    floor: IFloor | null = null;
    apartmentsColumns: string[] = ['id', 'number', 'actions'];

    constructor(
        protected floorService: FloorService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.floorService.getById(id).subscribe({
            next: (res: FloorResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IFloor = res.body?.data!;
                this.floor = data;
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
