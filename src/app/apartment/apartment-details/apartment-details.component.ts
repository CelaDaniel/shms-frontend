import { Component, OnInit } from '@angular/core';
import { ApartmentResponseType, ApartmentService } from '../apartment.service';
import { ActivatedRoute } from '@angular/router';
import { IApartment } from '../apartment.model';

@Component({
    selector: 'app-apartment-details',
    templateUrl: './apartment-details.component.html',
    styleUrls: ['./apartment-details.component.scss'],
})
export class ApartmentDetailsComponent implements OnInit {
    apartment: IApartment | null = null;

    constructor(
        protected apartmentService: ApartmentService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.apartmentService.getById(id).subscribe({
            next: (res: ApartmentResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IApartment = res.body?.data!;
                this.apartment = data;
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
