import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Login } from 'src/app/login/login.model';
import { ForgotPassword } from 'src/app/forgot-password/forgot-password.model';
import { Router } from '@angular/router';
import { ResetPassword } from 'src/app/reset-password/reset-password.model';
import { ActivateUser } from 'src/app/activate-user/actrivate-user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private resourceUrl = `${environment.apiUrl}/auth`;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.hasToken()
    );
    private http: HttpClient;

    constructor(private handler: HttpBackend, private router: Router) {
        this.http = new HttpClient(handler);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    login(credentials: Login): Observable<any> {
        return this.http.post(`${this.resourceUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    forgotPassword(body: ForgotPassword): Observable<any> {
        return this.http.post(`${this.resourceUrl}/forget-password`, body);
    }

    resetPassword(body: ResetPassword, token: string): Observable<any> {
        return this.http.post(`${this.resourceUrl}/reset-password`, body, {
            headers: {
                Authorization: token,
            },
        });
    }

    activate(body: ActivateUser, token: string): Observable<any> {
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
                    this.router.navigate(['/login']);
                    return throwError(error);
                })
            )
            .subscribe((res: any) => {
                localStorage.removeItem('token');
                this.isAuthenticatedSubject.next(false);
                this.router.navigate(['/login']);
            });
    }
}
