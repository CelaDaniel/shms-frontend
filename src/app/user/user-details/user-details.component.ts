import { Component, OnInit } from '@angular/core';
import { UserResponseType, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user.model';
import { UserStatus } from 'src/app/enums/user-status.model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
    user: IUser | null = null;
    userStatus = UserStatus;
    constructor(
        protected userService: UserService,
        protected route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.params.subscribe((params) => {
            const id = params['id'];
            this.loadById(id);
        });
    }

    loadById(id: number): void {
        this.userService.getById(id).subscribe({
            next: (res: UserResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IUser = res.body?.data!;
                this.user = data;
                console.log(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
