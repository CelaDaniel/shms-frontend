import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IResponse } from '../core/response/response.model';
import { IDashboardTab } from './home.model';

export type DashboardTabResponseType = HttpResponse<IResponse<IDashboardTab>>;

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
}
