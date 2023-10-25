import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormService } from 'src/shared/service/form.service';

@Component({
    selector: 'unknown-consumption-dialog',
    templateUrl: 'unknown-consumption-dialog.component.html',
    styleUrls: ['./unknown-consumption-dialog.component.scss'],
})
export class UnknownConsumptionDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<UnknownConsumptionDialogComponent>,
        private formService: FormService
    ) {}

    close(): void {
        this.dialogRef.close();
    }

    nextStep(): void {
        this.formService.next();
        this.dialogRef.close();
    }
}
