import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.isLoginRequest(req)) {
            return next.handle(req);
        }
        const modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        return next.handle(modifiedReq);
    }

    private isLoginRequest(req: HttpRequest<any>): boolean {
        return req.url.includes('/auth');
    }
}
