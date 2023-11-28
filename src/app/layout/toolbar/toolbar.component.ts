import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IUser } from 'src/app/user/user.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    user: IUser | null = null;
    pageTitle = '';
    constructor(private authService: AuthService, private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateTitle();
            }
        });
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateTitle();
            }
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
