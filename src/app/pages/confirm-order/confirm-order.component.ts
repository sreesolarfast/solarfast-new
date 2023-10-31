import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlineEnquiryDto } from 'src/shared/dto/online-enquiry-dto';
import { FormService } from 'src/shared/service/form.service';
import { OnlineEnquiryService } from 'src/shared/service/online-enquiry.service';

@Component({
    selector: 'page-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent {
    form: FormGroup;
    onlineEnquiry: OnlineEnquiryDto;
    formSubmitted: boolean;

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

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x == null) return;
                this.onlineEnquiry = x;

                // // redirect if an order has been generated
                // if (x.orderId != null) {
                // this.formService.activeStep = this.formService.getSteps().filter(s => s.step == step.next)[0];
                // this.formService.redirectToCorrectStep();
                // }
            },
        });

        this.form = this.fb.group({
            firstName: [this.onlineEnquiry?.firstName ?? null, [Validators.required]],
            lastName: [this.onlineEnquiry?.lastName ?? null, [Validators.required]],
            email: [this.onlineEnquiry?.email ?? null, [Validators.required, Validators.email]],
            phoneNumber: [this.onlineEnquiry?.phoneNumber ?? null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            addressLine1: [this.onlineEnquiry?.addressLine1 ?? null],
            addressLine2: [this.onlineEnquiry?.addressLine2 ?? null],
            city: [this.onlineEnquiry?.city ?? null],
            postcode: [
                {
                    value: this.onlineEnquiryService.result.postcode,
                    disabled: false,
                },
            ],
            subscribe: [null],
        });

        this.form.controls['phoneNumber'].valueChanges.subscribe((val: string) => {
            if (val.indexOf('+44') >= 0) this.form.controls['phoneNumber'].setValue(val.replace('+44', '0'), { emitEvent: false });
        });
    }

    submitForm() {

        this.formSubmitted = true;
        if (!this.form.valid) {
            this.form.markAsDirty();
            return;
        }

        const value = this.form.getRawValue();
        this.onlineEnquiry.sendQuote = true;
        this.onlineEnquiry.firstName = value.firstName;
        this.onlineEnquiry.lastName = value.lastName;
        this.onlineEnquiry.email = value.email;
        this.onlineEnquiry.phoneNumber = value.phoneNumber;
        this.onlineEnquiry.addressLine1 = value.addressLine1;
        this.onlineEnquiry.addressLine2 = value.addressLine2;
        this.onlineEnquiry.city = value.city;
        this.onlineEnquiry.postcode = value.postcode;

        // Handle form submission
        this.onlineEnquiryService.createOrder(this.onlineEnquiry).subscribe({
            next: x => {
                this.formService.next();
                this.formSubmitted = false;
            },
        });
    }
}
