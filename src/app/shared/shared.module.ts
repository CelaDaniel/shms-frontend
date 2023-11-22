import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FormatDatePipe } from './date/format-date.pipe';
import { FormatDateTimePipe } from './date/format-datetime.pipe';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    imports: [SharedLibsModule],
    declarations: [FormatDatePipe, FormatDateTimePipe, FilterComponent],
    exports: [
        SharedLibsModule,
        FormatDatePipe,
        FormatDateTimePipe,
        FilterComponent,
    ],
})
export class SharedModule {}
