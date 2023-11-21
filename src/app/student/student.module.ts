import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StudentDetailsComponent } from './student-details/student-details.compont';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
    imports: [SharedModule, StudentRoutingModule],
    declarations: [
        StudentDetailsComponent,
        StudentFormComponent,
        StudentListComponent,
    ],
})
export class StudentModule {}
