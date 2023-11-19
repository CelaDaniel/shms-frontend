import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { Login } from 'src/app/login/login.model';
import { ForgotPassword } from 'src/app/forgot-password/forgot-password.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private resourceUrl = `${environment.apiUrl}/auth`;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.hasToken()
    );

    constructor(private http: HttpClient, private router: Router) {}

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

    logout(): void {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }
}
