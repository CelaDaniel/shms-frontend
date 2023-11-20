import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IUser } from './user.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';

export type UserResponseType = HttpResponse<IResponse<IUser>>;
export type UserArrayResponseType = HttpResponse<IArrayResponse<IUser>>;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private resourceUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<UserArrayResponseType> {
        return this.http.get<IArrayResponse<IUser>>(this.resourceUrl, {
            observe: 'response',
        });
    }

    getById(id: number): Observable<UserResponseType> {
        return this.http.get<IResponse<IUser>>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    update(id: number, user: IUser): Observable<UserResponseType> {
        return this.http.put<IResponse<IUser>>(
            `${this.resourceUrl}/${id}`,
            user,
            { observe: 'response' }
        );
    }

    restore(id: number): Observable<UserResponseType> {
        return this.http.put<IResponse<IUser>>(
            `${this.resourceUrl}/${id}/restore`,
            {},
            { observe: 'response' }
        );
    }

    create(user: IUser): Observable<UserResponseType> {
        return this.http.post<IResponse<IUser>>(this.resourceUrl, user, {
            observe: 'response',
        });
    }

    changePassword(user: IUser): Observable<UserResponseType> {
        return this.http.post<IResponse<IUser>>(
            `${this.resourceUrl}/change-password`,
            user,
            {
                observe: 'response',
            }
        );
    }

    delete(id: number): Observable<UserResponseType> {
        return this.http.delete<IResponse<IUser>>(`${this.resourceUrl}/${id}`, {
            observe: 'response',
        });
    }

    permanentDelete(id: number): Observable<UserResponseType> {
        return this.http.delete<IResponse<IUser>>(
            `${this.resourceUrl}/permanent/${id}`,
            { observe: 'response' }
        );
    }

    getDeleted(): Observable<UserArrayResponseType> {
        return this.http.get<IArrayResponse<IUser>>(
            `${this.resourceUrl}/deleted`,
            {
                observe: 'response',
            }
        );
    }

    getLoggedInUser(): Observable<UserArrayResponseType> {
        return this.http.get<IArrayResponse<IUser>>(
            `${this.resourceUrl}/logged`,
            {
                observe: 'response',
            }
        );
    }
}
