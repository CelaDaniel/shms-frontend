import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IUser } from 'src/app/user/user.model';
import { UserResponseType, UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    loggedIn = false;
    user: IUser | null = null;
    pageTitle = '';
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateTitle();
            }
        });

        this.authService.isAuthenticated().subscribe((authenticated) => {
            this.loggedIn = authenticated;
        });

        this.authService
            .getAuthenticatedUser()
            .subscribe((authnticatedUser) => {
                this.user = authnticatedUser;
            });
    }

    logout(): void {
        this.authService.logout();
    }

    isCurrentRoute(path: string): boolean {
        return this.router.isActive(path, false);
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
        const title: string = routeSnapshot.data['pageTitle'] ?? '';
        if (routeSnapshot.firstChild) {
            return this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    private updateTitle(): void {
        let pageTitle = this.getPageTitle(
            this.router.routerState.snapshot.root
        );
        if (!pageTitle) {
            pageTitle = 'SHMS';
        }
        this.pageTitle = pageTitle;
    }
}
