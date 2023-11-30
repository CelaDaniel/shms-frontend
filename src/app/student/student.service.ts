import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IStudent } from './student.model';
import {
    IArrayResponse,
    IListResponse,
    IResponse,
} from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';

export type StudentResponseType = HttpResponse<IResponse<IStudent>>;
export type StudentArrayResponseType = HttpResponse<IArrayResponse<IStudent>>;
export type StudentListResponseType = HttpResponse<IListResponse<IStudent>>;

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private resourceUrl = `${environment.apiUrl}/students`;

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<StudentArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IStudent>>(this.resourceUrl, {
            params: options,
            observe: 'response',
        });
    }

    getAvailable(req?: any): Observable<StudentListResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IListResponse<IStudent>>(
            `${this.resourceUrl}/all`,
            {
                params: options,
                observe: 'response',
            }
        );
    }

    getById(id: number): Observable<StudentResponseType> {
        return this.http.get<IResponse<IStudent>>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    update(id: number, student: IStudent): Observable<StudentResponseType> {
        return this.http.put<IResponse<IStudent>>(
            `${this.resourceUrl}/${id}`,
            student,
            { observe: 'response' }
        );
    }

    create(student: IStudent): Observable<StudentResponseType> {
        return this.http.post<IResponse<IStudent>>(this.resourceUrl, student, {
            observe: 'response',
        });
    }

    delete(id: number): Observable<StudentResponseType> {
        return this.http.delete<IResponse<IStudent>>(
            `${this.resourceUrl}/${id}`,
            { observe: 'response' }
        );
    }
}
