import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IParkingSpot } from './parking-spot.model';
import {
    IArrayResponse,
    IListResponse,
    IResponse,
} from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type ParkingSpotResponseType = HttpResponse<IResponse<IParkingSpot>>;
export type ParkingSpotArrayResponseType = HttpResponse<
    IArrayResponse<IParkingSpot>
>;
export type ParkingSpotListResponseType = HttpResponse<
    IListResponse<IParkingSpot>
>;
@Injectable({
    providedIn: 'root',
})
export class ParkingSpotService {
    private resourceUrl = `${environment.apiUrl}/parking-spots`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<ParkingSpotArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IParkingSpot>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getAvailable(req?: any): Observable<ParkingSpotListResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListResponse<IParkingSpot>>(
            `${this.resourceUrl}/all`,
            {
                params: options,
                observe: 'response',
            }
        );
    }

    getById(id: number): Observable<ParkingSpotResponseType> {
        return this.http.get<IResponse<IParkingSpot>>(
            `${this.resourceUrl}/${id}`,
            {
                observe: 'response',
            }
        );
    }

    update(
        id: number,
        spot: IParkingSpot
    ): Observable<ParkingSpotResponseType> {
        return this.http.put<IResponse<IParkingSpot>>(
            `${this.resourceUrl}/${id}`,
            spot,
            { observe: 'response' }
        );
    }

    create(spot: IParkingSpot): Observable<ParkingSpotResponseType> {
        return this.http.post<IResponse<IParkingSpot>>(this.resourceUrl, spot, {
            observe: 'response',
        });
    }

    delete(id: number): Observable<ParkingSpotResponseType> {
        return this.http.delete<IResponse<IParkingSpot>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }
}
