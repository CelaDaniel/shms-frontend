import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: ':id/view',
        component: UserDetailsComponent,
    },
    {
        path: 'new',
        component: UserFormComponent,
    },
    {
        path: ':id/edit',
        component: UserFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
