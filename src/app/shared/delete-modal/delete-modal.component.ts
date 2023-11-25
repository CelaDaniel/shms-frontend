import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
    @Input() item?: string;
    @Output() confirmed = new EventEmitter<void>();
    @Output() canceled = new EventEmitter<void>();

    confirm() {
        this.confirmed.emit();
    }

    cancel() {
        this.canceled.emit();
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }
}
