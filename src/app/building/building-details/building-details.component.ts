import { Component, OnInit } from '@angular/core';
import { BuildingResponseType, BuildingService } from '../building.service';
import { ActivatedRoute } from '@angular/router';
import { IBuilding } from '../building.model';

@Component({
    selector: 'app-building-details',
    templateUrl: './building-details.component.html',
    styleUrls: ['./building-details.component.scss'],
})
export class BuildingDetailsComponent implements OnInit {
    building: IBuilding | null = null;
    constructor(
        protected buildingService: BuildingService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.buildingService.getById(id).subscribe({
            next: (res: BuildingResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IBuilding = res.body?.data!;
                this.building = data;
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
