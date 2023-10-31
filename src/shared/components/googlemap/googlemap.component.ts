import { OnlineEnquiryDto } from '../../dto/online-enquiry-dto';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { GeocoderResponse } from 'src/shared/model/geocoder-response.model';
import { GeocodingService } from '../../service/geocoding.service';
import { OnlineEnquiryService } from '../../service/online-enquiry.service';

@Component({
    selector: 'app-googlemap',
    templateUrl: './googlemap.component.html',
    styleUrls: ['./googlemap.component.scss'],
})
export class GooglemapComponent {
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

    submitted = false;
    onlineEnquiry: OnlineEnquiryDto | null;

    display: any;
    center!: google.maps.LatLngLiteral;
    mapCenter!: google.maps.LatLng;
    mapOptions: google.maps.MapOptions = {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 18,
        minZoom: 12,
        disableDefaultUI: true,
    };
    markerInfoContent = '';
    markerOptions: google.maps.MarkerOptions = {
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: './assets/map/map-icon.svg',
    };
    geocoderWorking = false;
    geolocationWorking = false;

    constructor(
        private geocodingService: GeocodingService,
        private route: Router,
        private formBuilder: FormBuilder,
        private onlineEnquiryService: OnlineEnquiryService
    ) {}
    ngOnInit(): void {
        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null) {
                    this.onlineEnquiry = x;
                    this.center = { lat: +this.onlineEnquiry.latitude, lng: +this.onlineEnquiry.longitude };

                    this.mapCenter = new google.maps.LatLng(this.center);
                }
            },
        });
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

                        this.markerOptions = {
                            draggable: true,
                            animation: google.maps.Animation.DROP,
                            icon: './assets/7/map-icon.svg',
                        };

                        this.markerInfoContent = value.formatted_address;

                        // todo direct to next step
                    }
                }
            })
            .finally(() => {
                this.geocoderWorking = false;
            });
    }
}
