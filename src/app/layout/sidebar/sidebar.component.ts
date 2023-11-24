import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    menuItems = [
        {
            path: '/home',
            label: 'Home',
            icon: 'home',
        },
        {
            path: '/buildings',
            label: 'Buildings',
            icon: 'domain',
        },
        {
            path: '/floors',
            label: 'Floors',
            icon: 'stairs',
        },
        {
            path: '/apartments',
            label: 'Apartments',
            icon: 'apartment',
        },
        {
            path: '/parking-floors',
            label: 'Parking Floors',
            icon: 'stairs',
        },
        {
            path: '/parking-spots',
            label: 'Parking Spots',
            icon: 'local_parking',
        },
        {
            path: '/elevators',
            label: 'Elevators',
            icon: 'elevator',
        },
        {
            path: '/students',
            label: 'Students',
            icon: 'groups',
        },
        {
            path: '/contracts',
            label: 'Contracts',
            icon: 'description',
        },
        {
            path: '/users',
            label: 'Users',
            icon: 'group',
        },
        {
            path: '/users/profile',
            label: 'Profile',
            icon: 'account_circle',
        },
    ];
    constructor(private authService: AuthService, private router: Router) {}

    logout(): void {
        this.authService.logout();
    }

    isCurrentRoute(path: string): boolean {
        return this.router.isActive(path, false);
    }
}
