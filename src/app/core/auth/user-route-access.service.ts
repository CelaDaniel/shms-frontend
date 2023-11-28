import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserRoles } from 'src/app/enums/roles.model';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map((isAuthenticated) => {
                if (isAuthenticated) {
                    const roles: UserRoles[] | UserRoles = route.data['roles'];

                    if (
                        !roles ||
                        roles.length === 0 ||
                        this.userService.hasAnyRole(roles)
                    ) {
                        return true;
                    }
                    this.router.navigate(['accessdenied']);
                    return false;
                }

                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
