import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    isLoggedIn = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((isAuthenticated) => {
            this.isLoggedIn = isAuthenticated;
        });
    }
}
