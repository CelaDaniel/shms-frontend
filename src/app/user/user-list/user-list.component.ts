import { Component, OnInit } from '@angular/core';
import {
    UserArrayResponseType,
    UserResponseType,
    UserService,
} from '../user.service';
import { IUser } from '../user.model';
import { IData } from 'src/app/core/response/response.model';
import { UserStatus } from 'src/app/enums/user-status.model';

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

    constructor(protected userService: UserService) {}

    ngOnInit(): void {
        this.loadLoggedInUser();
        this.loadAll();
    }

    loadAll(): void {
        this.userService.getAll().subscribe({
            next: (res: UserArrayResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IData<IUser> = res.body?.data!;
                this.users = data.content ?? [];
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
