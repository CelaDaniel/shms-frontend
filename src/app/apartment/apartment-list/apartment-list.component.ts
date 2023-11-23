import { Component, OnInit } from '@angular/core';
import {
    ApartmentArrayResponseType,
    ApartmentResponseType,
    ApartmentService,
} from '../apartment.service';
import { IApartment } from '../apartment.model';
import { IData } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { ApartmentTypes } from 'src/app/enums/apartment-types.model';

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
        'capacity',
        'floorNumber',
        'nrContracts',
        'kitchen',
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
            name: 'floorNumber',
            label: 'Floor Number',
            type: 'text',
        },
        {
            name: 'contractNumber',
            label: 'Contract Number',
            type: 'text',
        },
        {
            name: 'buildingNumber',
            label: 'Building Number',
            type: 'text',
        },
        {
            name: 'capacity',
            label: 'Capacity',
            type: 'number',
        },
        {
            name: 'apartmentType',
            label: 'Apartment Type',
            type: 'select',
            selectData: Object.values(ApartmentTypes),
        },
        {
            name: 'hasKitchen',
            label: 'Has Kitchen',
            type: 'boolean',
        },
        {
            name: 'deleted',
            label: 'Deleted',
            type: 'boolean',
        },
    ];

    constructor(protected apartmentService: ApartmentService) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.apartmentService.getAll(filter).subscribe({
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
