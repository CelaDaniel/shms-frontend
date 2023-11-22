import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IContract } from './contract.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';

export type ContractResponseType = HttpResponse<IResponse<IContract>>;
export type ContractArrayResponseType = HttpResponse<IArrayResponse<IContract>>;

@Injectable({
    providedIn: 'root',
})
export class ContractService {
    private resourceUrl = `${environment.apiUrl}/contracts`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<ContractArrayResponseType> {
        return this.http.get<IArrayResponse<IContract>>(this.resourceUrl, {
            observe: 'response',
        });
    }

    getById(id: number): Observable<ContractResponseType> {
        return this.http.get<IResponse<IContract>>(
            `${this.resourceUrl}/${id}`,
            {
                observe: 'response',
            }
        );
    }

    getFile(id: number): Observable<ContractResponseType> {
        return this.http.get<IResponse<IContract>>(
            `${this.resourceUrl}/${id}/file`,
            { observe: 'response' }
        );
    }

    update(id: number, contract: FormData): Observable<ContractResponseType> {
        return this.http.put<IResponse<IContract>>(
            `${this.resourceUrl}/${id}`,
            contract,
            { observe: 'response' }
        );
    }

    create(contract: FormData): Observable<ContractResponseType> {
        return this.http.post<IResponse<IContract>>(
            this.resourceUrl,
            contract,
            {
                observe: 'response',
            }
        );
    }

    delete(id: number): Observable<ContractResponseType> {
        return this.http.delete<IResponse<IContract>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }

    permanentDelete(id: number): Observable<ContractResponseType> {
        return this.http.delete<IResponse<IContract>>(
            `${this.resourceUrl}/permanent/${id}`,
            { observe: 'response' }
        );
    }
}
