import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GeocoderResponse } from '../../../shared/model/geocoder-response.model';
import { GeocodingService } from '../../../shared/service/geocoding.service';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';

@Component({
  selector: 'app-postal-code-entry',
  templateUrl: './postal-code-entry.component.html',
  styleUrls: ['./postal-code-entry.component.scss']
})
export class PostalCodeEntryComponent {

  submitted = false;
  form!: FormGroup;


  constructor(
    private geocodingService: GeocodingService, private route: Router, private formBuilder: FormBuilder, private onlineEnquiryService: OnlineEnquiryService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
        {
          postcode: [
            'LS25 6LR',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
              this.ukPostalCodeValidator
            ],
          ],
          latitude: [null],
          longitude: [null],
        }
      );
  }

  ukPostalCodeValidator(control: AbstractControl): ValidationErrors | null {
    const ukPostalCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i; // Case-insensitive
    const isValid = ukPostalCodeRegex.test(control.value);
    return isValid ? null : { ukPostalCode: true };
  }

  get validationControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;

  mapZoom = 14;
  mapCenter!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.HYBRID,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 12,
  };
  lat: any;
  lng: any;


  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  geocoderWorking = false;
  geolocationWorking = false;

  formattedAddress?: string | null = null;
  locationCoords?: google.maps.LatLng | null = null;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  // getCurrentLocation() {
  //   this.geolocationWorking = true;

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       this.geolocationWorking = false;

  //       let onlineEnquiry: OnlineEnquiryDto = this.form.getRawValue();

  //       const point: google.maps.LatLngLiteral = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };

  //       this.geocoderWorking = true;
  //       this.geocodingService
  //         .geocodeLatLng(point)
  //         .then((response: GeocoderResponse) => {
  //           if (response.status === 'OK' && response.results?.length) {
  //             const value = response.results[0];
  //             const loc: any = value.geometry.location;

  //             onlineEnquiry.latitude = loc.lat;
  //             onlineEnquiry.longitude = loc.lng;

  //             this.locationCoords = new google.maps.LatLng(point);

  //             this.mapCenter = new google.maps.LatLng(point);
  //             this.map.panTo(point);

  //             this.formattedAddress = value.formatted_address;
  //             this.markerInfoContent = value.formatted_address;


  //             this.markerOptions = {
  //               draggable: true,
  //               animation: google.maps.Animation.DROP,
  //             };
  //           } else {
  //             alert("err msg")
  //             // this.toastr.error(response.error_message, response.status);
  //           }
  //         })
  //         .finally(() => {
  //           this.geocoderWorking = false;
  //         });
  //     },
  //     (error) => {
  //       this.geolocationWorking = false;

  //       if (error.PERMISSION_DENIED) {
  //         alert("Couldn't get your location")
  //         // this.toastr.error("Couldn't get your location", 'Permission denied');
  //       } else if (error.POSITION_UNAVAILABLE) {
  //         // this.toastr.error(
  //         //   "Couldn't get your location",
  //         //   'Position unavailable'
  //         // );
  //         alert("Couldn't get your location Position unavailable")
  //       } else if (error.TIMEOUT) {
  //         alert("'Timed out")
  //         // this.toastr.error("Couldn't get your location", 'Timed out');
  //       } else {
  //         alert(error.message)
  //         // this.toastr.error(error.message, `Error: ${error.code}`);
  //       }
  //     },
  //     { enableHighAccuracy: true }
  //   );
  // }

  findAddress() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let onlineEnquiry: OnlineEnquiryDto = this.form.getRawValue();

    if (!onlineEnquiry || onlineEnquiry.postcode.length === 0) {
      return;
    }

    this.route.navigateByUrl(`?postcode=${onlineEnquiry.postcode}`);
    // this.route.navigateByUrl(`/solar?postcode=${onlineEnquiry.postcode}&companyId=1&repId=c9ec7efb-c7de-4437-93d1-876e4a94b4bd`);
    return;

}
}
