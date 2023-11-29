import {
    Directive,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserRoles } from 'src/app/enums/roles.model';
import { UserService } from 'src/app/user/user.service';

@Directive({
    selector: '[hasAnyRole]',
})
export class HasAnyRoleDirective implements OnDestroy {
    private roles!: UserRoles | UserRoles[];

    private readonly destroy$ = new Subject<void>();

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

    @Input() set hasAnyRole(value: UserRoles | UserRoles[]) {
        this.roles = value;
        this.updateView();

        this.userService
            .getLoggedInUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.updateView();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView(): void {
        const hasAnyRole = this.userService.hasAnyRole(this.roles);
        this.viewContainerRef.clear();
        if (hasAnyRole) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
