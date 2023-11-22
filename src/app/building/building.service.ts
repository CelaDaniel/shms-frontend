import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IBuilding } from './building.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type BuildingResponseType = HttpResponse<IResponse<IBuilding>>;
export type BuildingArrayResponseType = HttpResponse<IArrayResponse<IBuilding>>;

@Injectable({
    providedIn: 'root',
})
export class BuildingService {
    private resourceUrl = `${environment.apiUrl}/buildings`;

    constructor(private http: HttpClient) {}

    getAll(req?: any): Observable<BuildingArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IBuilding>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getById(id: number): Observable<BuildingResponseType> {
        return this.http.get<IResponse<IBuilding>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    update(id: number, building: IBuilding): Observable<BuildingResponseType> {
        return this.http.put<IResponse<IBuilding>>(
            `${this.resourceUrl}/${id}`,
            building,
            { observe: 'response' }
        );
    }

    create(building: IBuilding): Observable<BuildingResponseType> {
        return this.http.post<IResponse<IBuilding>>(
            this.resourceUrl,
            building,
            { observe: 'response' }
        );
    }

    delete(id: number): Observable<BuildingResponseType> {
        return this.http.delete<IResponse<IBuilding>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    permanentDelete(id: number): Observable<BuildingResponseType> {
        return this.http.delete<IResponse<IBuilding>>(
            `${this.resourceUrl}/permanent/${id}`,
            { observe: 'response' }
        );
    }
}
