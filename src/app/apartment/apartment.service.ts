import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IApartment } from './apartment.model';
import {
    IArrayResponse,
    IListResponse,
    IResponse,
} from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type ApartmentResponseType = HttpResponse<IResponse<IApartment>>;
export type ApartmentArrayResponseType = HttpResponse<
    IArrayResponse<IApartment>
>;
export type ApartmentListResponseType = HttpResponse<IListResponse<IApartment>>;

@Injectable({
    providedIn: 'root',
})
export class ApartmentService {
    private resourceUrl = `${environment.apiUrl}/apartments`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<ApartmentArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IApartment>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getAvailable(req?: any): Observable<ApartmentListResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListResponse<IApartment>>(
            `${this.resourceUrl}/all`,
            {
                params: options,
                observe: 'response',
            }
        );
    }

    getById(id: number): Observable<ApartmentResponseType> {
        return this.http.get<IResponse<IApartment>>(
            `${this.resourceUrl}/${id}`,
            {
                observe: 'response',
            }
        );
    }

    update(
        id: number,
        apartment: IApartment
    ): Observable<ApartmentResponseType> {
        return this.http.put<IResponse<IApartment>>(
            `${this.resourceUrl}/${id}`,
            apartment,
            { observe: 'response' }
        );
    }

    create(apartment: IApartment): Observable<ApartmentResponseType> {
        return this.http.post<IResponse<IApartment>>(
            this.resourceUrl,
            apartment,
            {
                observe: 'response',
            }
        );
    }

    delete(id: number): Observable<ApartmentResponseType> {
        return this.http.delete<IResponse<IApartment>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }
}
