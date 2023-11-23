import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IElevator } from './elevator.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type ElevatorResponseType = HttpResponse<IResponse<IElevator>>;
export type ElevatorArrayResponseType = HttpResponse<IArrayResponse<IElevator>>;

@Injectable({
    providedIn: 'root',
})
export class ElevatorService {
    private resourceUrl = `${environment.apiUrl}/elevators`;

    constructor(private http: HttpClient) {}

    getAll(req?: any): Observable<ElevatorArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IElevator>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getById(id: number): Observable<ElevatorResponseType> {
        return this.http.get<IResponse<IElevator>>(
            `${this.resourceUrl}/${id}`,
            {
                observe: 'response',
            }
        );
    }

    update(id: number, elevator: IElevator): Observable<ElevatorResponseType> {
        return this.http.put<IResponse<IElevator>>(
            `${this.resourceUrl}/${id}`,
            elevator,
            { observe: 'response' }
        );
    }

    create(elevator: IElevator): Observable<ElevatorResponseType> {
        return this.http.post<IResponse<IElevator>>(
            this.resourceUrl,
            elevator,
            {
                observe: 'response',
            }
        );
    }

    delete(id: number): Observable<ElevatorResponseType> {
        return this.http.delete<IResponse<IElevator>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    permanentDelete(id: number): Observable<ElevatorResponseType> {
        return this.http.delete<IResponse<IElevator>>(
            `${this.resourceUrl}/permanent/${id}`,
            { observe: 'response' }
        );
    }
}
