import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../service/form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlineEnquiryService } from '../../service/online-enquiry.service';
import { OnlineEnquiryDto } from '../../dto/online-enquiry-dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    form: FormGroup;
    dto: OnlineEnquiryDto;

    environment = environment;

    constructor(
        public dialogRef: MatDialogRef<ContactUsComponent>,
        private formService: FormService,
        private fb: FormBuilder,
        private onlineEnquiryService: OnlineEnquiryService,
    ) {}

    ngOnInit(): void {
        this.onlineEnquiryService.result$.subscribe({
            next: (x) => {
                this.dto = x;
            }
        })

        this.form = this.fb.group({
            firstName: [this?.dto?.firstName ?? null, [Validators.required]],
            lastName: [this?.dto?.lastName ?? null, [Validators.required]],
            email: [this?.dto?.email ?? null, [Validators.required, Validators.email]],
            phoneNumber: [this?.dto?.phoneNumber ?? null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            reason: [null, Validators.required]
        });

        this.form.controls['phoneNumber'].valueChanges.subscribe(
            (val: string) => {
               if (val.indexOf('+44') >= 0)
               this.form.controls['phoneNumber'].setValue(val.replace('+44', '0'), {emitEvent: false});
            }
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    nextStep(): void {
        this.formService.next();
        this.dialogRef.close();
    }

    submitForm(){
        const dto: OnlineEnquiryDto = this.form.getRawValue();
        this.onlineEnquiryService.contact(dto).subscribe({
            next: (x) => {
                // enquiry sent
                     this.dialogRef.close();

                     // todo add a notification
            }
        })
    }
}
