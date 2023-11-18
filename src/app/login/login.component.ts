import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    authError = false;

    loginForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ){}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe(authenticated => {
            if(authenticated){
                this.router.navigate(['']);
            }
        })
    }

    login(): void {
        this.authService.login({
            email: this.loginForm.get('email')!.value!,
            password: this.loginForm.get('password')!.value!
        }).subscribe({
            next: () => {
                this.authError = false;
                this.router.navigate(['']);
            },
            error: () => (this.authError = true)
        });
    }
}