import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardTabResponseType, HomeService } from './home.service';
import { IDashboardTab } from './home.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    dashboardTabs = [
        {
            label: 'Students',
        },
        {
            label: 'Apartments',
        },
        {
            label: 'Parking Spots',
        },
        {
            label: 'Contracts',
        },
    ];

    selectedTabData?: IDashboardTab;

    constructor(
        private authService: AuthService,
        private router: Router,
        private homeService: HomeService
    ) {}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((authenticated) => {
            if (!authenticated) {
                this.router.navigate(['/auth/login']);
            }
        });

        const firstTabName = this.dashboardTabs[0].label
            .toLowerCase()
            .replace(' ', '-');
        this.loadTabData(firstTabName);
    }

    tabChanged(event: MatTabChangeEvent): void {
        const label = event.tab.textLabel;
        const tabName = label.toLowerCase().replace(' ', '-');
        this.loadTabData(tabName);
    }

    loadTabData(tabName: string): void {
        this.homeService.get(tabName).subscribe({
            next: (res: DashboardTabResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IDashboardTab = res.body?.data!;
                this.selectedTabData = data;
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
