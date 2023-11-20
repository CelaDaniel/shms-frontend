import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-activate-user',
    templateUrl: './activate-user.component.html',
    styleUrls: ['./activate-user.component.scss'],
})
export class ActivateUserComponent implements OnInit {
    token = '';
    hide = true;
    hideConfirm = true;

    activateUserForm = this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((queryParams) => {
            this.token = queryParams['token'];
        });
    }

    submit(): void {
        const password = this.activateUserForm.get('password')!.value!;
        const confirmPassword =
            this.activateUserForm.get('confirmPassword')!.value!;

        if (password === confirmPassword) {
            this.authService
                .activate(
                    {
                        password: password,
                    },
                    this.token
                )
                .subscribe({
                    next: (res) => {
                        this.showSnackBar(`${res.message}`);
                        this.router.navigate(['']);
                    },
                    error: (e) => {
                        this.showSnackBar(e.error?.message);
                    },
                });
        } else {
            this.showSnackBar("Passwords don't match! Please try again!");
        }
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
