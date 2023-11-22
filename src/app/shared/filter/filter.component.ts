import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilter } from './filter.model';

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
        this.filterApplied.emit(this.filter);
    }

    clear(): void {
        this.filter = {};
    }
}
