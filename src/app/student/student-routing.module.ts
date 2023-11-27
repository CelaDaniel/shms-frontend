import { NgModule } from '@angular/core';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.compont';
import { StudentFormComponent } from './student-form/student-form.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';
import { UserRoles } from '../enums/roles.model';

const routes: Routes = [
    {
        path: '',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: StudentListComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/view',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: StudentDetailsComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: 'new',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: StudentFormComponent,
        canActivate: [UserRouteAccessService],
    },
    {
        path: ':id/edit',
        data: { roles: [UserRoles.MANAGER, UserRoles.USER] },
        component: StudentFormComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
