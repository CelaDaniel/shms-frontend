import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
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
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

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
