import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
    name: 'formatDateTime',
})
export class FormatDateTimePipe implements PipeTransform {
    transform(day: dayjs.Dayjs | null | undefined): string {
        return day ? day.format('DD/MM/YYYYTHH:mm:ss') : '';
    }
}
