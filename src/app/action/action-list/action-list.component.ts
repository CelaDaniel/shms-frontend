import { Component, OnInit } from '@angular/core';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAction } from '../action.model';
import {
    ActionArrayResponseType,
    ActionResponseType,
    ActionService,
} from '../action.service';
import { ActionStatus } from 'src/app/enums/action-status.model';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-action-list',
    templateUrl: './action-list.component.html',
    styleUrls: ['./action-list.component.scss'],
})
export class ActionListComponent implements OnInit {
    actions: IAction[] = [];
    actionsColumns: string[] = [
        'id',
        'action',
        'requestMethod',
        'status',
        'error',
        'statusCode',
        'createdAt',
        'createdBy',
        'actions',
    ];

    filterFields: IFilter[] = [
        {
            name: 'action',
            label: 'Action',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'requestMethod',
            label: 'Request Method',
            type: 'text',
        },
        {
            name: 'error',
            label: 'Error',
            type: 'text',
        },
        {
            name: 'statusCode',
            label: 'Status Code',
            type: 'number',
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            selectData: Object.values(ActionStatus),
        },
        {
            name: 'user',
            label: 'User',
            type: 'text',
        },
        {
            name: 'startDate',
            label: 'Start date',
            type: 'date',
        },
        {
            name: 'endDate',
            label: 'End date',
            type: 'date',
        },
    ];

    filter?: { [key: string]: string };

    totalElements = 0;
    pageSize = PAGE_SIZE;
    page = 0;
    pageSizeOptions = PAGE_SIZE_OPTIONS;
    sortDirection?: string;
    sortColumn?: string;
    opened = false;
    deleteAllOpened = false;
    actionId?: number;

    constructor(
        protected actionService: ActionService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.actionService
            .query({
                ...filter,
                page: this.page,
                size: this.pageSize,
                direction: this.sortDirection,
                ordering: this.sortDirection && this.sortColumn,
            })
            .subscribe({
                next: (res: ActionArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IAction> = res.body?.data!;
                    this.actions = data.content ?? [];
                    const pageable: IPagination = data.pageable;
                    this.page = pageable.pageNumber;
                    this.pageSize = pageable.pageSize;
                    this.totalElements = pageable.totalElements;
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
    }

    handlePagination(paginationData: {
        pageIndex: number;
        pageSize: number;
    }): void {
        this.page = paginationData.pageIndex;
        this.pageSize = paginationData.pageSize;
        this.loadAll(this.filter);
    }

    sortChange(sortState: Sort) {
        this.sortColumn = sortState.active;
        this.sortDirection = sortState.direction.toUpperCase();
        this.loadAll(this.filter);
    }

    openModal(id: number): void {
        this.actionId = id;
        this.opened = true;
    }

    openDeleteAllModal(): void {
        this.deleteAllOpened = true;
    }

    closeModal(): void {
        this.opened = false;
    }

    closeDeleteAllModal(): void {
        this.deleteAllOpened = false;
    }

    deleteAction(): void {
        this.actionService.delete(this.actionId!).subscribe({
            next: (res: ActionResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message!;
                this.showSnackBar(message);
                const data: IAction = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
        this.closeModal();
    }

    deleteAll(data: any): void {
        const start = dayjs(data.startDate).format('YYYY-MM-DD');
        const end = dayjs(data.endDate).format('YYYY-MM-DD');

        this.actionService
            .deleteAll({
                startDate: start,
                endDate: end,
            })
            .subscribe({
                next: (res: ActionResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message!;
                    this.showSnackBar(message);
                    this.loadAll();
                },
                error: (res: any) => {
                    console.log(res.body);
                },
            });
        this.closeDeleteAllModal();
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
