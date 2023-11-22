import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
    name: 'formatDateTime',
})
export class FormatDateTimePipe implements PipeTransform {
    transform(day: string | null | undefined): string {
        const date = dayjs(day);
        return date ? date.format('DD/MM/YYYYTHH:mm:ss') : '';
    }
}
