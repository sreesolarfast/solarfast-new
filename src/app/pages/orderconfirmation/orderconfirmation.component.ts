import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlineEnquiryDto } from 'src/shared/dto/online-enquiry-dto';
import { FormService } from 'src/shared/service/form.service';
import { OnlineEnquiryService } from 'src/shared/service/online-enquiry.service';


@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.scss']
})
export class OrderconfirmationComponent {
    form: FormGroup;
    selectedYear: number = new Date().getFullYear();
    selectedMonth: number = new Date().getMonth();
    selectedDate: Date | null = null;
    selectedButtons: Set<string> = new Set<string>();
    currentDate: Date = new Date();

    years: number[] = [2023, 2024, 2025]; // Customize with your desired years
    months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
            phone: [null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
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
        if (this.form.valid) {
            const value: OnlineEnquiryDto = this.form.getRawValue();

            // todo patch value to saved value

            // Handle form submission


            this.formService.next();
        } else {
            this.form.markAsDirty();
            // Form is not valid, show error messages or take appropriate action
        }
    }

    backButton() {
        this.formService.back();
    }
}
