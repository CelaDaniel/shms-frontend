import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IParkingFloor } from './parking-floor.model';
import {
    IArrayResponse,
    IListResponse,
    IResponse,
} from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type ParkingFloorResponseType = HttpResponse<IResponse<IParkingFloor>>;
export type ParkingFloorArrayResponseType = HttpResponse<
    IArrayResponse<IParkingFloor>
>;
export type ParkingFloorListResponseType = HttpResponse<
    IListResponse<IParkingFloor>
>;

@Injectable({
    providedIn: 'root',
})
export class ParkingFloorService {
    private resourceUrl = `${environment.apiUrl}/parking-floors`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<ParkingFloorArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IParkingFloor>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getAll(): Observable<ParkingFloorListResponseType> {
        return this.http.get<IListResponse<IParkingFloor>>(
            `${this.resourceUrl}/all`,
            {
                observe: 'response',
            }
        );
    }

    getById(id: number): Observable<ParkingFloorResponseType> {
        return this.http.get<IResponse<IParkingFloor>>(
            `${this.resourceUrl}/${id}`,
            {
                observe: 'response',
            }
        );
    }

    update(
        id: number,
        floor: IParkingFloor
    ): Observable<ParkingFloorResponseType> {
        return this.http.put<IResponse<IParkingFloor>>(
            `${this.resourceUrl}/${id}`,
            floor,
            { observe: 'response' }
        );
    }

    create(floor: IParkingFloor): Observable<ParkingFloorResponseType> {
        return this.http.post<IResponse<IParkingFloor>>(
            this.resourceUrl,
            floor,
            {
                observe: 'response',
            }
        );
    }

    delete(id: number): Observable<ParkingFloorResponseType> {
        return this.http.delete<IResponse<IParkingFloor>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }
}
