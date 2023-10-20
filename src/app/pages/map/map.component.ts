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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
 
    submitted= false;
    onlineEnquiry: OnlineEnquiryDto | null;

    display : any;
    center!: google.maps.LatLngLiteral;
    mapCenter!: google.maps.LatLng;
    mapOptions: google.maps.MapOptions = {
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: true,
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
      icon: 'assets/map/map-icon.png',
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
      private geocodingService: GeocodingService, private route: Router, private formBuilder: FormBuilder, private postalCodeService:EnteredPostalCodeService, private onlineEnquiryService: OnlineEnquiryService
   , private formService: FormService ) {

    }
    

    ngOnInit(): void {

        const step = this.formService.getSteps().filter(x => x.component == 'page-map')[0];
        if (step != this.formService.activeStep) {
          this.formService.redirectToCorrectStep();
        }

  this.onlineEnquiryService.result$.subscribe({
    next: (x) => {
     if (x != null) {
      this.onlineEnquiry = x;
      this.center = {lat: +this.onlineEnquiry.latitude, lng: +this.onlineEnquiry.longitude};
      this.mapCenter = new google.maps.LatLng(this.center);
     }
    }
  })
    }

    openInfoWindow(marker: MapMarker) {
      this.infoWindow.open(marker);
    }

    moveMap(event: google.maps.MapMouseEvent) {
      if(event.latLng!= null)
      this.center = (event.latLng.toJSON());
    }

    move(event: google.maps.MapMouseEvent) {
      if(event.latLng != null)
      this.display = event.latLng.toJSON();
    }

    zoomIn() {
      this.map.zoom++;
    }
  
    zoomOut() {
      this.map.zoom--;
    }
  

    onMapDragEnd(event: any) {
      this.onlineEnquiry.latitude = event.latLng?.lat();
      this.onlineEnquiry.longitude = event.latLng?.lng()

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
                // debugger;
              const value = response.results[0];

              this.mapCenter = new google.maps.LatLng(point);
              this.map.panTo(point);

              this.onlineEnquiryService.setOnlineEnquiry(this.onlineEnquiry);

              this.markerOptions = {
                draggable: true,
                animation: google.maps.Animation.DROP,
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