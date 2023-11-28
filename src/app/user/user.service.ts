import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IChangePassword, IUser } from './user.model';
import { IArrayResponse, IResponse } from '../core/response/response.model';
import { createRequestOption } from '../core/request/request-util';
import { UserRoles } from '../enums/roles.model';

export type UserResponseType = HttpResponse<IResponse<IUser>>;
export type UserArrayResponseType = HttpResponse<IArrayResponse<IUser>>;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private resourceUrl = `${environment.apiUrl}/users`;
    private currentUser: IUser | null = null;

    constructor(private http: HttpClient) {
        const user = localStorage.getItem('user');
        if (user) {
            this.currentUser = this.decodeUser(user);
        }
    }

    query(req?: any): Observable<UserArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArrayResponse<IUser>>(this.resourceUrl, {
            params: options,
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

    changePassword(body: IChangePassword): Observable<HttpResponse<{}>> {
        return this.http.post(`${this.resourceUrl}/change-password`, body, {
            observe: 'response',
        });
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

    getLoggedInUser(): Observable<UserResponseType> {
        return this.http
            .get<IResponse<IUser>>(`${this.resourceUrl}/logged`, {
                observe: 'response',
            })
            .pipe(
                tap((res: UserResponseType) => {
                    this.currentUser = res.body?.data ?? null;
                })
            );
    }

    hasAnyRole(roles: UserRoles[] | UserRoles): boolean {
        if (!this.currentUser) {
            return false;
        }

        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        return this.currentUser.roles!.some((role: UserRoles) =>
            roles.includes(role)
        );
    }

    private decodeUser(encodedUser: string): IUser {
        return JSON.parse(atob(encodedUser));
    }
}
