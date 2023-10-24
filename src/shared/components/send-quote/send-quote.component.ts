import { Component, OnInit } from '@angular/core';
import { OnlineEnquiryService } from '../../service/online-enquiry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlineEnquiryDto } from '../../dto/online-enquiry-dto';

@Component({
  selector: 'app-send-quote',
  templateUrl: './send-quote.component.html',
  styleUrls: ['./send-quote.component.css']
})
export class SendQuoteComponent implements OnInit {
form: FormGroup;
    onlineEnquiry: OnlineEnquiryDto;

  constructor(private onlineEnquiryService: OnlineEnquiryService, private fb: FormBuilder) { }

  ngOnInit() {
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
        subscribe: [this.onlineEnquiry?.subscribe ?? null],
    });

    this.form.controls['phone'].valueChanges.subscribe(
        (val: string) => {
           if (val.indexOf('+44') >= 0)
           this.form.controls['phone'].setValue(val.replace('+44', '0'), {emitEvent: false});
        }
    );


  }

  submitForm() {
    const value = this.form.getRawValue();
    this.onlineEnquiry.sendQuote = true;
    this.onlineEnquiry.firstName = value.firstName;
    this.onlineEnquiry.lastName = value.lastName;
    this.onlineEnquiry.email = value.email;
    this.onlineEnquiry.phoneNumber = value.phone;

    this.onlineEnquiryService.manage(this.onlineEnquiry).subscribe({
        next: (x) => {

        }
    });
  }

}
