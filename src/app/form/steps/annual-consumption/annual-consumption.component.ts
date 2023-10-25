import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyType } from '../../../../shared/enum/property-type.enum';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from '../../../../shared/service/online-enquiry.service';
import { FormControl } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { UnknownConsumptionDialogComponent } from 'src/shared/components/unknown-consumption-dialog/unknown-consumption-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'step-annual-consumption',
    templateUrl: './annual-consumption.component.html',
    styleUrls: ['./annual-consumption.component.scss'],
})
export class AnnualConsumptionComponent implements OnInit {
    @Input() step: FormStep;
    @Output() newStep = new EventEmitter<number | null>();
    control = new FormControl(null);

    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.control.setValue(this.onlineEnquiryService.result.annualConsumption);
    }

    answerGiven() {
        this.onlineEnquiryService.result.annualConsumption = this.control.value;

        this.newStep.emit(this.step.next);
    }

    iDontKnowDialog(): void {
        const dialogRef = this.dialog.open(UnknownConsumptionDialogComponent, {
            width: '520px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            // Handle the result after the dialog is closed
        });
    }
}
