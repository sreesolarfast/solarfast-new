import { OnlineEnquiryService } from './../../../shared/service/online-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';

@Component({
    selector: 'page-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
    form: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-confirm-order')[0];
        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }

        this.form = this.fb.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            phoneNumber: [null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            addressLine1: [null],
            addressLine2: [null],
            city: [null],
            postcode: [
                {
                    value: this.onlineEnquiryService.result.postcode,
                    disabled: true,
                },
            ],
            subscribe: [null],
        });
    }
    submitForm() {
        debugger;
        if (!this.form.valid) {
            this.form.markAsDirty();
            return;
        }
        const value: OnlineEnquiryDto = this.form.getRawValue();
        this.onlineEnquiryService.result.firstName = value.firstName;
        this.onlineEnquiryService.result.lastName = value.lastName;
        this.onlineEnquiryService.result.email = value.email;
        this.onlineEnquiryService.result.phoneNumber = value.phoneNumber;
        this.onlineEnquiryService.result.addressLine1 = value.addressLine1;
        this.onlineEnquiryService.result.addressLine2 = value.addressLine2;
        this.onlineEnquiryService.result.addressLine3 = value.addressLine3;

        this.formService.next();
    }
}
