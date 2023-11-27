import { Component, OnInit } from '@angular/core';
import { UserResponseType, UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatus } from 'src/app/enums/user-status.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    user: IUser | null = null;
    userStatus = UserStatus;

    hide = true;
    hideOld = true;
    hideConfirm = true;

    changePasswordForm = this.fb.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
    });

    constructor(
        protected userService: UserService,
        protected route: ActivatedRoute,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadLoggedInUser();
    }

    loadLoggedInUser(): void {
        this.userService.getLoggedInUser().subscribe({
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

    submit(): void {
        const old_password = this.changePasswordForm.get('oldPassword')!.value!;
        const new_password = this.changePasswordForm.get('newPassword')!.value!;
        const confirmPassword =
            this.changePasswordForm.get('confirmPassword')!.value!;

        if (new_password === confirmPassword) {
            this.userService
                .changePassword({
                    new_password,
                    old_password,
                })
                .subscribe({
                    next: (res: any) => {
                        const data = res.body?.data;
                        localStorage.setItem('token', data.access_token);
                        this.showSnackBar(res.body.message);
                        this.resetForm();
                        this.loadLoggedInUser();
                    },
                    error: (e) => {
                        this.showSnackBar(e.error?.message);
                    },
                });
        } else {
            this.showSnackBar("Passwords don't match! Please try again!");
        }
    }

    resetForm(): void {
        this.changePasswordForm.clearValidators();
        this.changePasswordForm.updateValueAndValidity();
        this.changePasswordForm.reset();
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
