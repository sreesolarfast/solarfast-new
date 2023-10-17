import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GeocoderResponse } from '../../../shared/model/geocoder-response.model';
import { EnteredPostalCodeService } from '../../../shared/service/enteredpostalcode.service';
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
    private geocodingService: GeocodingService, private route: Router, private formBuilder: FormBuilder, private postalCodeService:EnteredPostalCodeService, private onlineEnquiryService: OnlineEnquiryService
  ) { }

  ngOnInit(): void {
    this.form = this.postalCodeService.initializeForm();
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
    mapTypeId: google.maps.MapTypeId.SATELLITE,
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

    this.route.navigateByUrl(`/solar?postcode=${onlineEnquiry.postcode}&companyId=1&repId=c9ec7efb-c7de-4437-93d1-876e4a94b4bd`);
    return;

    this.geocoderWorking = true;
    this.geocodingService
      .getLocation(onlineEnquiry.postcode)
      .subscribe(
        (response: GeocoderResponse) => {
          if (response.status === 'OK' && response.results?.length) {
            const location = response.results[0];
            const loc: any = location.geometry.location;

            onlineEnquiry.latitude = loc.lat;
            onlineEnquiry.longitude = loc.lng;

            this.mapCenter = location.geometry.location;

            setTimeout(() => {
              if (this.map !== undefined) {
                this.map.panTo(location.geometry.location);
              }
            }, 500);

            this.formattedAddress = location.formatted_address;
            this.markerInfoContent = location.formatted_address;

            this.markerOptions = {
              draggable: true,
              animation: google.maps.Animation.DROP,
            };

            // save the enquiry to local storage
            this.onlineEnquiryService.manage(onlineEnquiry).subscribe({
              next: (x) => {
                this.route.navigate(['/solar']);
              }
            });
          } else {
            console.error('postal-code-entry', response );
            // this.toastr.error(response.error_message, response.status);
          }
        },
        (err: HttpErrorResponse) => {
          console.error('geocoder error', err);
        }
      )
      .add(() => {
        this.geocoderWorking = false;
      });
  }
  // onMapDragEnd(event: any) {

  // onMapDragEnd(event: any) {
  //   this.lat = event.latLng?.lat();
  //   this.lng = event.latLng?.lng()

  //   const point: google.maps.LatLngLiteral = {
  //     lat: this.lat,
  //     lng: this.lng,
  //   };

  //   this.geocoderWorking = true;
  //   this.geocodingService
  //     .geocodeLatLng(point)
  //     .then((response: GeocoderResponse) => {
  //       if (response.status === 'OK') {
  //         if (response.results.length) {
  //           const value = response.results[0];

  //           this.locationCoords = new google.maps.LatLng(point);

  //           this.mapCenter = new google.maps.LatLng(point);
  //           this.map.panTo(point);

  //           address = value.formatted_address;
  //           this.formattedAddress = value.formatted_address;

  //           this.markerOptions = {
  //             draggable: true,
  //             animation: google.maps.Animation.DROP,
  //           };

  //           this.markerInfoContent = value.formatted_address;
  //         }
  //       }
  //     })
  //     .finally(() => {
  //       this.geocoderWorking = false;
  //     });
  // }
}
