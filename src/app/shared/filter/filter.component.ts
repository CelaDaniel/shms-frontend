import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter } from './filter.model';
import * as dayjs from 'dayjs';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
    @Input() fields: IFilter[] = [];
    @Output() filterApplied = new EventEmitter<{ [key: string]: string }>();

    filter: { [key: string]: string } = {};

    applyFilter(): void {
        Object.keys(this.filter).forEach((key) => {
            if (key.toLowerCase().includes('date')) {
                this.filter[key] = dayjs(this.filter[key]).format('YYYY-MM-DD');
            }
        });

        this.filterApplied.emit(this.filter);
    }

    clear(): void {
        this.filter = {};
    }
}
