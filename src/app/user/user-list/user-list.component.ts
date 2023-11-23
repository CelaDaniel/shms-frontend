import { Component, OnInit } from '@angular/core';
import {
    UserArrayResponseType,
    UserResponseType,
    UserService,
} from '../user.service';
import { IUser } from '../user.model';
import { IData, IPagination } from 'src/app/core/response/response.model';
import { UserStatus } from 'src/app/enums/user-status.model';
import { IFilter } from 'src/app/shared/filter/filter.model';
import { UserRoles } from 'src/app/enums/roles.model';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'src/app/constants/pagination';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    users: IUser[] = [];
    currentUser?: IUser;
    userStatus = UserStatus;
    displayedColumns: string[] = [
        'id',
        'firstName',
        'lastName',
        'email',
        'roles',
        'status',
        'actions',
    ];

    filterFields: IFilter[] = [
        {
            name: 'number',
            label: 'Number',
            type: 'text',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'userStatus',
            label: 'Status',
            type: 'select',
            selectData: Object.values(UserStatus),
        },
        {
            name: 'userRole',
            label: 'Role',
            type: 'select',
            selectData: Object.values(UserRoles),
        },
        {
            name: 'deleted',
            label: 'Deleted',
            type: 'boolean',
        },
    ];

    filter?: { [key: string]: string };

    totalElements = 0;
    pageSize = PAGE_SIZE;
    page = 0;
    pageSizeOptions = PAGE_SIZE_OPTIONS;

    constructor(protected userService: UserService) {}

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadAll();
    }

    search(filter: { [key: string]: string }): void {
        this.filter = filter;
        this.loadAll(filter);
    }

    loadAll(filter?: { [key: string]: string }): void {
        this.userService
            .getAll({
                ...filter,
                page: this.page,
                size: this.pageSize,
            })
            .subscribe({
                next: (res: UserArrayResponseType) => {
                    const code = res.body?.code;
                    const message = res.body?.message;
                    const data: IData<IUser> = res.body?.data!;
                    this.users = data.content ?? [];
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

    loadLoggedInUser(): void {
        this.userService.getLoggedInUser().subscribe({
            next: (res: UserResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IUser = res.body?.data!;
                this.currentUser = data;
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

    deleteUser(user: IUser): void {
        this.userService.delete(user.id!).subscribe({
            next: (res: UserResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IUser = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    restoreUser(user: IUser): void {
        this.userService.restore(user.id!).subscribe({
            next: (res: UserResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IUser = res.body?.data!;
                this.loadAll();
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }
}
