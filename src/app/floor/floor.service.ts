import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IFloor } from './floor.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type FloorResponseType = HttpResponse<IResponse<IFloor>>;
export type FloorArrayResponseType = HttpResponse<IArrayResponse<IFloor>>;

@Injectable({
    providedIn: 'root',
})
export class FloorService {
    private resourceUrl = `${environment.apiUrl}/floors`;

    constructor(private http: HttpClient) {}

    getAll(req?: any): Observable<FloorArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IFloor>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getById(id: number): Observable<FloorResponseType> {
        return this.http.get<IResponse<IFloor>>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    update(id: number, floor: IFloor): Observable<FloorResponseType> {
        return this.http.put<IResponse<IFloor>>(
            `${this.resourceUrl}/${id}`,
            floor,
            { observe: 'response' }
        );
    }

    create(floor: IFloor): Observable<FloorResponseType> {
        return this.http.post<IResponse<IFloor>>(this.resourceUrl, floor, {
            observe: 'response',
        });
    }

    delete(id: number): Observable<FloorResponseType> {
        return this.http.delete<IResponse<IFloor>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    permanentDelete(id: number): Observable<FloorResponseType> {
        return this.http.delete<IResponse<IFloor>>(
            `${this.resourceUrl}/permanent/${id}`,
            { observe: 'response' }
        );
    }
}
