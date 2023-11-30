import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IContract } from './contract.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type ContractResponseType = HttpResponse<IResponse<IContract>>;
export type ContractArrayResponseType = HttpResponse<IArrayResponse<IContract>>;

@Injectable({
    providedIn: 'root',
})
export class ContractService {
    private resourceUrl = `${environment.apiUrl}/contracts`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<ContractArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IContract>>(this.resourceUrl, {
            params: options,
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

    getFile(id: number): Observable<Blob> {
        return this.http.get(`${this.resourceUrl}/${id}/file`, {
            responseType: 'blob',
        });
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
}
