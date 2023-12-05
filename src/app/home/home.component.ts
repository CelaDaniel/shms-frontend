import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
    DashboardTabResponseType,
    HomeService,
    RevenueDataResponseType,
} from './home.service';
import { IDashboardTab, IRevenueData } from './home.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RevenuePeriodTypes } from '../enums/revenue-period-types.model';
import * as dayjs from 'dayjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    dateRangeForm: FormGroup;

    periodTypes = Object.keys(RevenuePeriodTypes);

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

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: '',
                backgroundColor: 'rgba(50, 168, 82,0.2)',
                borderColor: 'rgba(50, 168, 82,1)',
                pointBackgroundColor: 'rgba(50, 168, 82,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(50, 168, 82,0.8)',
                fill: 'origin',
            },
            {
                data: [],
                label: '',
                backgroundColor: 'rgba(168, 50, 50,0.2)',
                borderColor: 'rgba(168, 50, 50,1)',
                pointBackgroundColor: 'rgba(168, 50, 50,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(168, 50, 50,0.8)',
                fill: 'origin',
            },
            {
                data: [],
                label: '',
                backgroundColor: 'rgba(168, 105, 50,0.2)',
                borderColor: 'rgba(168, 105, 50,1)',
                pointBackgroundColor: 'rgba(168, 105, 50,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(168, 105, 50,0.8)',
                fill: 'origin',
            },
        ],
        labels: [],
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0,
            },
        },
        scales: {
            y: {
                position: 'left',
            },
        },
        plugins: {
            legend: { display: true },
        },
    };

    public lineChartType: ChartType = 'line';

    constructor(
        private authService: AuthService,
        private router: Router,
        private homeService: HomeService,
        private fb: FormBuilder
    ) {
        this.dateRangeForm = this.fb.group({
            periodType: [RevenuePeriodTypes.ThisWeek, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
        });
    }

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
        const periodType: RevenuePeriodTypes =
            this.dateRangeForm.get('periodType')!.value!;
        this.loadRevenueData(periodType);
    }

    tabChanged(event: MatTabChangeEvent): void {
        const label = event.tab.textLabel;
        const tabName = label.toLowerCase().replace(' ', '-');
        this.loadTabData(tabName);
    }

    onTypeChange(type: RevenuePeriodTypes): void {
        if (type !== RevenuePeriodTypes.Custom) {
            this.loadRevenueData(type);
        }
    }

    applyDateRange(): void {
        const type = this.dateRangeForm.get('periodType')!.value!;
        const startDate = this.dateRangeForm.get('startDate')!.value!;
        const endDate = this.dateRangeForm.get('endDate')!.value!;

        if (startDate && endDate) {
            const start = dayjs(startDate).format('YYYY-MM-DD');
            const end = dayjs(endDate).format('YYYY-MM-DD');
            this.loadRevenueData(type, start, end);
        }
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

    loadRevenueData(
        periodType: RevenuePeriodTypes,
        start?: string,
        end?: string
    ): void {
        this.homeService
            .getRevenueData({
                revenuePeriodType: periodType,
                startDate: start,
                endDate: end,
            })
            .subscribe({
                next: (res: RevenueDataResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IRevenueData = res.body?.data!;
                    // const data: IRevenueData = {
                    //     datasets: [
                    //         {
                    //             data: [65, 59, 80, 81, 56, 55, 40],
                    //             label: 'Total Revenue',
                    //         },
                    //         {
                    //             data: [35, 30, 40, 61, 31, 25, 30],
                    //             label: 'Apartments Revenue',
                    //         },
                    //         {
                    //             data: [30, 29, 40, 20, 25, 30, 10],
                    //             label: 'ParkingSpots Revenue',
                    //         },
                    //     ],
                    //     labels: [
                    //         'January',
                    //         'February',
                    //         'March',
                    //         'April',
                    //         'May',
                    //         'June',
                    //         'July',
                    //     ],
                    // };
                    this.lineChartData.datasets[0].data = data.datasets[0].data;
                    this.lineChartData.datasets[0].label =
                        data.datasets[0].label;
                    this.lineChartData.datasets[1].data = data.datasets[1].data;
                    this.lineChartData.datasets[1].label =
                        data.datasets[1].label;
                    this.lineChartData.datasets[2].data = data.datasets[2].data;
                    this.lineChartData.datasets[2].label =
                        data.datasets[2].label;
                    this.lineChartData.labels = data.labels;
                    if (this.chart) {
                        this.chart.update();
                    }
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
    }
}
