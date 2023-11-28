import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserRoles } from 'src/app/enums/roles.model';

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
            roles: [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/buildings',
            label: 'Buildings',
            icon: 'domain',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/floors',
            label: 'Floors',
            icon: 'stairs',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/apartments',
            label: 'Apartments',
            icon: 'apartment',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/parking-floors',
            label: 'Parking Floors',
            icon: 'stairs',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/parking-spots',
            label: 'Parking Spots',
            icon: 'local_parking',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/elevators',
            label: 'Elevators',
            icon: 'elevator',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/students',
            label: 'Students',
            icon: 'groups',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/contracts',
            label: 'Contracts',
            icon: 'description',
            roles: [UserRoles.MANAGER, UserRoles.USER],
        },
        {
            path: '/users',
            label: 'Users',
            icon: 'group',
            roles: [UserRoles.ADMIN],
        },
    ];
    constructor(private router: Router) {}

    isCurrentRoute(path: string): boolean {
        return this.router.isActive(path, false);
    }
}
