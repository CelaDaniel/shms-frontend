import { NgModule } from '@angular/core';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.compont';
import { StudentFormComponent } from './student-form/student-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: StudentListComponent,
    },
    {
        path: ':id/view',
        component: StudentDetailsComponent,
    },
    {
        path: 'new',
        component: StudentFormComponent,
    },
    {
        path: ':id/edit',
        component: StudentFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
