import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OnlineEnquiryDto } from '../../dto/online-enquiry-dto';
import { OnlineEnquiryService } from '../../service/online-enquiry.service';

@Component({
    selector: 'app-send-quote',
    templateUrl: './send-quote.component.html',
    styleUrls: ['./send-quote.component.scss'],
})
export class SendQuoteComponent implements OnInit {
    form: FormGroup;
    onlineEnquiry: OnlineEnquiryDto;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private onlineEnquiryService: OnlineEnquiryService, private fb: FormBuilder, private dialog: MatDialog) {}

    ngOnInit() {
        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x == null) return;

                this.onlineEnquiry = x;
            },
        });

        this.form = this.fb.group({
            firstName: [this.onlineEnquiry?.firstName ?? null, [Validators.required]],
            lastName: [this.onlineEnquiry?.lastName ?? null, [Validators.required]],
            email: [this.onlineEnquiry?.email ?? null, [Validators.required, Validators.email]],
            phone: [this.onlineEnquiry?.phoneNumber ?? null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            subscribe: [this.onlineEnquiry?.subscribe ?? null],
        });

        this.form.controls['phone'].valueChanges.subscribe((val: string) => {
            if (val.indexOf('+44') >= 0) this.form.controls['phone'].setValue(val.replace('+44', '0'), { emitEvent: false });
        });
    }

    submitForm() {
        debugger;
        const value = this.form.getRawValue();
        this.onlineEnquiry.sendQuote = true;
        this.onlineEnquiry.firstName = value.firstName;
        this.onlineEnquiry.lastName = value.lastName;
        this.onlineEnquiry.email = value.email;
        this.onlineEnquiry.phoneNumber = value.phone;
        this.onlineEnquiry.selectedPackageId = this.data;

        this.onlineEnquiryService.manage(this.onlineEnquiry).subscribe({
            next: x => {
                this.close();
            },
        });
    }

    close() {
        this.dialog.closeAll();
    }
}
