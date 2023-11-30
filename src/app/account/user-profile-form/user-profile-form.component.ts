import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, UserProfile } from 'src/app/user/user.model';
import { UserResponseType, UserService } from 'src/app/user/user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnInit {
    userForm: FormGroup;

    constructor(protected userService: UserService, private fb: FormBuilder) {
        this.userForm = this.fb.group({
            number: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[A-Z]{1}[0-9]{8}[A-Z]{1}$'),
                ],
            ],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            description: [''],
        });
    }

    ngOnInit(): void {
        this.loadLoggedInUser();
    }

    loadLoggedInUser(): void {
        this.userService.getLoggedInUser().subscribe({
            next: (res: UserResponseType) => {
                const data: IUser = res.body?.data!;
                this.userForm.patchValue(data);
            },
            error: (res: any) => {
                console.log(res.body);
            },
        });
    }

    onSubmit(): void {
        const user: IUser = new UserProfile(
            this.userForm.get('number')!.value!,
            this.userForm.get('firstName')!.value!,
            this.userForm.get('lastName')!.value!,
            this.userForm.get('email')!.value!,
            this.userForm.get('description')!.value!
        );

        this.userService.updateProfile(user).subscribe({
            next: (res: UserResponseType) => {
                const data: IUser = res.body?.data!;
                this.userForm.patchValue(data);
            },
            error: (error) => {
                console.error('Error creating user:', error);
            },
        });
    }

    goBack(): void {
        window.history.back();
    }
}
