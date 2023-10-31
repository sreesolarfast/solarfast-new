import { Component, EventEmitter, Output } from '@angular/core';
import { FormService } from 'src/shared/service/form.service';

@Component({
    selector: 'page-thank-you',
    templateUrl: './thank-you.component.html',
    styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent {
    @Output() previousStepEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() nextStepEvent: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private formService: FormService,
    ) {}

    ngOnInit () {
        const step = this.formService.getSteps().filter(x => x.component == 'thank-you')[0];
        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }
    }

    onPreviousStepClick() {
        this.formService.back();
    }

    onNextStepClick() {
        this.formService.next();
    }
}
