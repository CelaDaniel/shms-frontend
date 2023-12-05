import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';
import { IAction } from './action.model';

export type ActionResponseType = HttpResponse<IResponse<IAction>>;
export type ActionArrayResponseType = HttpResponse<IArrayResponse<IAction>>;

@Injectable({
    providedIn: 'root',
})
export class ActionService {
    private resourceUrl = `${environment.apiUrl}/admin/action`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<ActionArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IAction>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getById(id: number): Observable<ActionResponseType> {
        return this.http.get<IResponse<IAction>>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    delete(id: number): Observable<ActionResponseType> {
        return this.http.delete<IResponse<IAction>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    deleteAll(req?: any): Observable<ActionResponseType> {
        const options = createRequestOption(req);
        return this.http.delete<IResponse<IAction>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }
}
