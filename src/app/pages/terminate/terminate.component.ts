import { OnlineEnquiryService } from 'src/shared/service/online-enquiry.service';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';

@Component({
    selector: 'app-terminate',
    templateUrl: './terminate.component.html',
    styleUrls: ['./terminate.component.scss'],
})
export class TerminateComponent implements OnInit {
    form: FormGroup;
    reason: string;
    dto: OnlineEnquiryDto;

    constructor(public router: Router, private locationStrategy: LocationStrategy, private fb: FormBuilder, private onlineEnquiryService: OnlineEnquiryService) {}

    ngOnInit() {
        const state = this.locationStrategy.getState() as any;
        this.reason = state.reason;

        this.form = this.fb.group({
            firstName: [this?.dto?.firstName ?? null, [Validators.required]],
            lastName: [this?.dto?.lastName ?? null, [Validators.required]],
            email: [this?.dto?.email ?? null, [Validators.required, Validators.email]],
            phoneNumber: [this?.dto?.phoneNumber ?? null, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
            reason: [this.reason, Validators.required]
        });

        this.form.controls['phoneNumber'].valueChanges.subscribe(
            (val: string) => {
               if (val.indexOf('+44') >= 0)
               this.form.controls['phoneNumber'].setValue(val.replace('+44', '0'), {emitEvent: false});
            }
        );
    }

    backButton() {
        this.router.navigate(['/']);
    }

    submitForm(){
        const dto: OnlineEnquiryDto = this.form.getRawValue();
        this.onlineEnquiryService.contact(dto).subscribe({
            next: (x) => {
                     // todo add a notification
            }
        })
    }
}
