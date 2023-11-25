import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FormatDatePipe } from './date/format-date.pipe';
import { FormatDateTimePipe } from './date/format-datetime.pipe';
import { FilterComponent } from './filter/filter.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
    imports: [SharedLibsModule],
    declarations: [
        FormatDatePipe,
        FormatDateTimePipe,
        FilterComponent,
        DeleteModalComponent,
    ],
    exports: [
        SharedLibsModule,
        FormatDatePipe,
        FormatDateTimePipe,
        FilterComponent,
        DeleteModalComponent,
    ],
})
export class SharedModule {}
