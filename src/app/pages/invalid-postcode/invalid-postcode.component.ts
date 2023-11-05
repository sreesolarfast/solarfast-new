import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeocodingService } from '../../../shared/service/geocoding.service';
import { IAddress } from '../../../shared/interface/address';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-invalid-postcode',
    templateUrl: './invalid-postcode.component.html',
    styleUrls: ['./invalid-postcode.component.scss'],
    animations: [
        trigger('fadeIn', [
            state('void', style({ opacity: 0 })), // Initial state (invisible)
            transition(':enter', [animate('100ms')]), // Transition to visible when added to the DOM
        ]),
    ],
})
export class InvalidPostcodeComponent implements OnInit {
    form: FormGroup;
    addressLookup: IAddress;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        public formService: FormService,
        private onlineEnquiryService: OnlineEnquiryService,
        private geocodeService: GeocodingService
    ) {}

    ngOnInit() {
        // prevent load of page with a valid postcode
        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null && x?.latitude != null && x?.longitude != null) this.formService.redirectToCorrectStep();
            },
        });

        this.form = this.fb.group({
            postcode: [null, Validators.required],
        });
    }

    getLocation() {
        const postcode = this.form.get('postcode').value;
        this.geocodeService.getAddressesFromPostcode(postcode).subscribe({
            next: x => {
                this.submitted = true;
                this.addressLookup = x;
            },
        });
    }

    selectAddress(index: any) {
        if (index == null) return;
        const address = this.addressLookup.addresses[index];

        const houseNameOrNumber =
            address.building_name != ''
                ? address.building_name
                : address.building_number != ''
                ? address.building_number
                : address.sub_building_name != ''
                ? address.sub_building_name
                : address.sub_building_number != ''
                ? address.sub_building_number
                : '';

        this.onlineEnquiryService.result = {
            addressLine1: `${houseNameOrNumber} ${address.thoroughfare}`,
            addressLine2: address.line_2,
            addressLine3: address.line_3,
            city: address.town_or_city,
            postcode: this.form.get('postcode').value,
            latitude: this.addressLookup.latitude,
            longitude: this.addressLookup.longitude,
        } as OnlineEnquiryDto;

        this.formService.redirectToCorrectStep();
    }
}
