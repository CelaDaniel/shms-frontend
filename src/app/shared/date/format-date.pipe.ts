import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
    transform(day: string | null | undefined): string {
        const date = dayjs(day);
        return date ? date.format('DD/MM/YYYY') : '';
    }
}
