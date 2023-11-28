import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Router } from '@angular/router';
import {
    IActivateUser,
    IForgotPassword,
    ILogin,
    IResetPassword,
} from 'src/app/auth/auth.model';
import { IUser } from 'src/app/user/user.model';
import { UserResponseType } from 'src/app/user/user.service';
import { IResponse } from '../response/response.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private resourceUrl = `${environment.apiUrl}/auth`;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.hasToken()
    );
    private currentUserSubject = new BehaviorSubject<IUser | null>(null);
    private http: HttpClient;

    constructor(private handler: HttpBackend, private router: Router) {
        this.http = new HttpClient(handler);
        const user = localStorage.getItem('user');
        if (user) {
            this.currentUserSubject.next(this.decodeUser(user));
        }
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getAuthenticatedUser(): Observable<IUser | null> {
        return this.currentUserSubject.asObservable();
    }

    login(credentials: ILogin): Observable<any> {
        return this.http.post(`${this.resourceUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    this.isAuthenticatedSubject.next(true);
                    this.http
                        .get<IResponse<IUser>>(
                            `${environment.apiUrl}/users/logged`,
                            {
                                headers: {
                                    Authorization: `Bearer ${response.access_token}`,
                                },
                                observe: 'response',
                            }
                        )
                        .subscribe({
                            next: (res: UserResponseType) => {
                                const user: IUser | null =
                                    res.body?.data ?? null;
                                this.currentUserSubject.next(user);
                                localStorage.setItem(
                                    'user',
                                    this.encodeUser(user)
                                );
                            },
                            error: (res: any) => {
                                this.currentUserSubject.next(null);
                                console.log(res.body);
                            },
                        });
                }
            })
        );
    }

    forgotPassword(body: IForgotPassword): Observable<any> {
        return this.http.post(`${this.resourceUrl}/forget-password`, body);
    }

    resetPassword(body: IResetPassword, token: string): Observable<any> {
        return this.http.post(`${this.resourceUrl}/reset-password`, body, {
            headers: {
                Authorization: token,
            },
        });
    }

    activate(body: IActivateUser, token: string): Observable<any> {
        return this.http.post(`${this.resourceUrl}/activate`, body, {
            headers: {
                Authorization: token,
            },
        });
    }

    logout(): void {
        const token = localStorage.getItem('token') ?? '';
        this.http
            .post(
                `${this.resourceUrl}/logout`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .pipe(
                catchError((error) => {
                    localStorage.removeItem('token');
                    this.isAuthenticatedSubject.next(false);
                    this.currentUserSubject.next(null);
                    this.router.navigate(['/auth/login']);
                    return throwError(error);
                })
            )
            .subscribe((res: any) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.isAuthenticatedSubject.next(false);
                this.currentUserSubject.next(null);
                this.router.navigate(['/auth/login']);
            });
    }

    private encodeUser(user: IUser | null): string {
        const userToStore: IUser = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            roles: user?.roles,
        };
        return btoa(JSON.stringify(userToStore));
    }

    private decodeUser(encodedUser: string): IUser {
        return JSON.parse(atob(encodedUser));
    }
}
