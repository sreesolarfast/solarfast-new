import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';
import { GeocoderResponse } from '../../../shared/model/geocoder-response.model';
import { EnteredPostalCodeService } from '../../../shared/service/enteredpostalcode.service';
import { GeocodingService } from '../../../shared/service/geocoding.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { FormService } from '../../../shared/service/form.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

    data = [
        {
          itemsList: [
            {
              options: [
                {
                  img: 'assets/map/drag-the-map-bg.png',
                  type: 'Find your home ',
                  name: 'Find your home',
                  description: 'We’ve located your area using your post code, so just look for your house.'
                },
                {
                  img: 'assets/map/use-zoom-bg.png',
                  type: 'Zoom In',
                  name: 'Zoom In',
                  description:'Use the zoom control to get as close as possible to your roof.'
                },
                {
                  img: 'assets/map/drop-pin-bg.png',
                  type: 'Pin it!',
                  name: 'Pin it!',
                  description: 'Simply tap your roof to drop a pin in it, we’ll do the rest.'
                }
              ]
            }
          ]
        }
      ];

    submitted = false;
    onlineEnquiry: OnlineEnquiryDto | null;
    addressAvilable=true;

    display: any;
    center!: google.maps.LatLngLiteral;
    mapCenter!: google.maps.LatLng;
    mapOptions: google.maps.MapOptions = {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 20,
        minZoom: 12,
        disableDefaultUI: true,
        // zoomControlOptions:{
        //     position:google.maps.ControlPosition.BOTTOM_CENTER,
        // }

    };
    zoom: number = 20;
    markerInfoContent = '';
    markerOptions: google.maps.MarkerOptions = {
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: './assets/map/map-icon.png',
    };
    geocoderWorking = false;
    geolocationWorking = false;

    /*{
                "img": 'assets/7/drag-the-map-bg.png',
                "type": '',
                "description": "Locate your house by dragging the map.",
                "name": "Drag the map"
              },
              {
                "img": 'assets/7/use-zoom-bg.png',
                "type": '',
                "description": "Locate your house by dragging the map.",
                "name": "Use the zoom controls"
              },
              {
                "img": 'assets/7/drop-pin-bg.png',
                "type": '',
                "description": "Tap to drop the pin on your rooftop.",
                "name": "Drop the pin"
              },
    */

    constructor(
        private geocodingService: GeocodingService,
        private route: Router,
        private formBuilder: FormBuilder,
        private postalCodeService: EnteredPostalCodeService,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService, private mapZoomDetected: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-map')[0];
        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null) {
                    this.onlineEnquiry = x;
                    this.center = { lat: +this.onlineEnquiry.latitude, lng: +this.onlineEnquiry.longitude };
                    this.mapCenter = new google.maps.LatLng(this.center);
                }
            },
        });
        if(this.onlineEnquiry.latitude && this.onlineEnquiry.longitude){
          this.addressAvilable=false;
        }
    }

    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = event.latLng.toJSON();
    }

    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }

    zoomIn() {
        if(!(this.zoom === this.mapOptions.maxZoom || this.zoom >= this.mapOptions.maxZoom)){
            if (this.map) {
              this.zoom++;
              this.mapZoomDetected.detectChanges();
            }
          }
    }

    zoomOut() {
        if(!(this.zoom === this.mapOptions.minZoom)){
            if (this.map) {
              this.zoom--;
              this.mapZoomDetected.detectChanges();
            }
          }
    }

    onMapDragEnd(event: any) {
        this.onlineEnquiry.latitude = event.latLng?.lat();
        this.onlineEnquiry.longitude = event.latLng?.lng();
        const point: google.maps.LatLngLiteral = {
            lat: +this.onlineEnquiry.latitude,
            lng: +this.onlineEnquiry.longitude,
        };

        this.geocoderWorking = true;
        this.geocodingService
            .geocodeLatLng(point)
            .then((response: GeocoderResponse) => {
                if (response.status === 'OK') {
                    if (response.results.length) {
                        const value = response.results[0];
                        this.mapCenter = new google.maps.LatLng(point);
                        this.map.panTo(point);
                        this.onlineEnquiryService.setOnlineEnquiry(this.onlineEnquiry);
                        this.markerInfoContent = value.formatted_address;
                        // todo direct to next step
                    }
                }
            })
            .finally(() => {
                this.geocoderWorking = false;
            });

    }

    getStarted() {
    }
}
