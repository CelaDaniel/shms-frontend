import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IResponse } from '../core/response/response.model';
import { IDashboardTab, IRevenueData } from './home.model';
import { createRequestOption } from '../core/request/request-util';

export type DashboardTabResponseType = HttpResponse<IResponse<IDashboardTab>>;
export type RevenueDataResponseType = HttpResponse<IResponse<IRevenueData>>;

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private resourceUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) {}

    get(tab: string): Observable<DashboardTabResponseType> {
        return this.http.get<IResponse<IDashboardTab>>(
            `${this.resourceUrl}/${tab}`,
            {
                observe: 'response',
            }
        );
    }

    getRevenueData(req?: any): Observable<RevenueDataResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IResponse<IRevenueData>>(
            `${this.resourceUrl}/revenue`,
            {
                params: options,
                observe: 'response',
            }
        );
    }
}
