import { Component, OnInit } from '@angular/core';
import { UserResponseType, UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, User } from '../user.model';
import { UserRoles } from 'src/app/enums/roles.model';
import { UserStatus } from 'src/app/enums/user-status.model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    userRoles = Object.values(UserRoles);
    currentUser?: IUser;

    userForm: FormGroup;
    isEditMode = false;
    userId?: number;
    constructor(
        protected userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
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
            description: [''],
            email: ['', [Validators.required, Validators.email]],
            roles: [[UserRoles.USER], [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.isEditMode = true;
                this.userId = +params['id'];
                this.loadById(this.userId);
            }
        });
        this.loadLoggedInUser();
    }

    loadById(id: number): void {
        this.userService.getById(id).subscribe({
            next: (res: UserResponseType) => {
                const code = res.body?.code;
                const message = res.body?.message;
                const data: IUser = res.body?.data!;

                this.userForm.patchValue(data);
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

    onSubmit(): void {
        const user: IUser = new User(
            this.userForm.get('number')!.value!,
            this.userForm.get('firstName')!.value!,
            this.userForm.get('lastName')!.value!,
            this.userForm.get('description')!.value!,
            this.userForm.get('email')!.value!,
            this.userForm.get('roles')!.value!
        );

        const updatedUser: IUser = new User(
            this.userForm.get('number')!.value!,
            this.userForm.get('firstName')!.value!,
            this.userForm.get('lastName')!.value!,
            this.userForm.get('description')!.value!,
            this.userForm.get('email')!.value!,
            this.userForm.get('roles')!.value!
        );

        if (this.isEditMode) {
            // Update user
            this.userService.update(this.userId!, updatedUser).subscribe({
                next: () => {
                    this.router.navigate(['/users']);
                },
                error: (error) => {
                    console.error('Error updating user:', error);
                },
            });
        } else {
            // Create new user
            this.userService.create(user).subscribe({
                next: () => {
                    this.router.navigate(['/users']);
                },
                error: (error) => {
                    console.error('Error creating user:', error);
                },
            });
        }
    }

    goBack(): void {
        window.history.back();
    }
}
