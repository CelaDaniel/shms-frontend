import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required]],
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    submit(): void {
        this.authService
            .forgotPassword({
                email: this.forgotPasswordForm.get('email')!.value!,
            })
            .subscribe({
                next: (res) => {
                    this.showSnackBar(`${res.message}`);
                    this.router.navigate(['']);
                },
                error: (e) => {
                    this.showSnackBar(`Login failed. ${e.error?.message}`);
                },
            });
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
