import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    dashboardData: any = {
        students: {
            active: 0,
            total: 0,
        },
        apartments: {
            active: 0,
            total: 0,
        },
        parkingSpots: {
            active: 0,
            total: 0,
        },
        contracts: {
            active: 0,
            total: 0,
        },
    };

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((authenticated) => {
            if (!authenticated) {
                this.router.navigate(['/auth/login']);
            }
        });
    }
}
