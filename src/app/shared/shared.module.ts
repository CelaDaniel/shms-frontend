import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FormatDatePipe } from './date/format-date.pipe';
import { FormatDateTimePipe } from './date/format-datetime.pipe';
import { FilterComponent } from './filter/filter.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { HasAnyRoleDirective } from './auth/has-any-role.directive';

@NgModule({
    imports: [SharedLibsModule],
    declarations: [
        FormatDatePipe,
        FormatDateTimePipe,
        FilterComponent,
        DeleteModalComponent,
        HasAnyRoleDirective,
    ],
    exports: [
        SharedLibsModule,
        FormatDatePipe,
        FormatDateTimePipe,
        FilterComponent,
        DeleteModalComponent,
        HasAnyRoleDirective,
    ],
})
export class SharedModule {}
