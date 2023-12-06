import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-delete-all-modal',
    templateUrl: './delete-all-modal.component.html',
    styleUrls: ['./delete-all-modal.component.scss'],
})
export class DeleteAllModalComponent {
    @Output() confirmed = new EventEmitter<void>();
    @Output() canceled = new EventEmitter<void>();

    dateForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.dateForm = this.fb.group({
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
        });
    }

    confirm() {
        this.confirmed.emit(this.dateForm.value);
    }

    cancel() {
        this.canceled.emit();
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }
}
