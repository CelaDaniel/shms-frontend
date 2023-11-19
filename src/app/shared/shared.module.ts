import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FormatDatePipe } from './date/format-date.pipe';
import { FormatDateTimePipe } from './date/format-datetime.pipe';

@NgModule({
    imports: [SharedLibsModule],
    declarations: [FormatDatePipe, FormatDateTimePipe],
    exports: [SharedLibsModule, FormatDatePipe, FormatDateTimePipe],
})
export class SharedModule {}
