import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    hide = true;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((authenticated) => {
            if (authenticated) {
                this.router.navigate(['']);
            }
        });
    }

    login(): void {
        this.authService
            .login({
                email: this.loginForm.get('email')!.value!,
                password: this.loginForm.get('password')!.value!,
            })
            .subscribe({
                next: () => {
                    this.router.navigate(['']);
                },
                error: (e) => {
                    this.showSnackBar(`Login failed. ${e.error?.message}`);
                    this.loginForm.get('password')!.setValue('');
                },
            });
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}
