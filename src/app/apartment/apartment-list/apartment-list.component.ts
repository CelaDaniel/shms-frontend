import { Component, OnInit } from '@angular/core';
import {
    ApartmentArrayResponseType,
    ApartmentResponseType,
    ApartmentService,
} from '../apartment.service';
import { IApartment } from '../apartment.model';
import { IData } from 'src/app/core/response/response.model';

@Component({
    selector: 'app-apartment-list',
    templateUrl: './apartment-list.component.html',
    styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit {
    apartments: IApartment[] = [];
    apartmentsColumns: string[] = [
        'id',
        'number',
        'apartmentType',
        'area',
        'balconiesNo',
        'toiletsNo',
        'kitchen',
        'actions',
    ];

    constructor(protected apartmentService: ApartmentService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.apartmentService.getAll().subscribe({
            next: (res: ApartmentArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IApartment> = res.body?.data!;
                this.apartments = data.content ?? [];
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    deleteApartment(apartment: IApartment): void {
        this.apartmentService.delete(apartment.id!).subscribe({
            next: (res: ApartmentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IApartment = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
