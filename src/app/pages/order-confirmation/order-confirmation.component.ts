import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlineEnquiryDto } from 'src/shared/dto/online-enquiry-dto';
import { FormService } from 'src/shared/service/form.service';
import { OnlineEnquiryService } from 'src/shared/service/online-enquiry.service';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent {
    form: FormGroup;
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = new Date().getMonth();
    selectedDate: Date | null = null;
    selectedButtons: Set<string> = new Set<string>();
    currentDate: Date = new Date();

    years: number[] = [2023, 2024, 2025]; // Customize with your desired years
    months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    onlineEnquiry: OnlineEnquiryDto;

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
                if (x == null)  return;
                this.onlineEnquiry = x;
            },
        });

        this.form = this.fb.group({
            firstName: [this.onlineEnquiry?.firstName ?? null, [Validators.required]],
            lastName: [this.onlineEnquiry?.lastName ?? null, [Validators.required]],
            email: [this.onlineEnquiry?.email ?? null, [Validators.required, Validators.email]],
            phone: [this.onlineEnquiry?.phoneNumber ?? null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            addressLine1: [null],
            addressLine2: [null],
            city: [null],
            postcode: [
                {
                    value: this.onlineEnquiryService.result.postcode,
                    disabled: false,
                },
            ],
            subscribe: [null],
        });

        this.form.controls['phone'].valueChanges.subscribe(
            (val: string) => {
               if (val.indexOf('+44') >= 0)
               this.form.controls['phone'].setValue(val.replace('+44', '0'), {emitEvent: false});
            }
        );
    }

    submitForm() {
        if (this.form.valid) {
            const value = this.form.getRawValue();
            this.onlineEnquiry.sendQuote = true;
            this.onlineEnquiry.firstName = value.firstName;
            this.onlineEnquiry.lastName = value.lastName;
            this.onlineEnquiry.email = value.email;
            this.onlineEnquiry.phoneNumber = value.phone;
            this.onlineEnquiry.addressLine1 = value.addressLine1;
            this.onlineEnquiry.addressLine2 = value.addressLine2;
            this.onlineEnquiry.city = value.city;
            this.onlineEnquiry.postcode = value.postcode;

            // Handle form submission
            this.onlineEnquiryService.createOrder(this.onlineEnquiry).subscribe({
                next: (x) => {
                    this.formService.next();
                }
            });
        } else {
            this.form.markAsDirty();
            // Form is not valid, show error messages or take appropriate action
        }
    }

    backButton() {
        this.formService.back();
    }
}
