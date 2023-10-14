import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeocoderResponse } from '../model/geocoder-response.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeLatLng(
    location: google.maps.LatLngLiteral
  ): Promise<GeocoderResponse> {
    let geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: location }, (results: any, status) => {
        const response = new GeocoderResponse(status, results);
        resolve(response);
      });
    });
  }

  getLocation(term: string): Observable<GeocoderResponse> {
    if (environment.bypassGoogle)
      return of(JSON.parse(`{"results":[{"address_components":[{"long_name":"LS25 6LR","short_name":"LS25 6LR","types":["postal_code"]},{"long_name":"Prospect Avenue","short_name":"Prospect Ave","types":["route"]},{"long_name":"Sherburn in Elmet","short_name":"Sherburn in Elmet","types":["locality","political"]},{"long_name":"Leeds","short_name":"Leeds","types":["postal_town"]},{"long_name":"North Yorkshire","short_name":"North Yorkshire","types":["administrative_area_level_2","political"]},{"long_name":"England","short_name":"England","types":["administrative_area_level_1","political"]},{"long_name":"United Kingdom","short_name":"GB","types":["country","political"]}],"formatted_address":"Prospect Ave, Sherburn in Elmet, Leeds LS25 6LR, UK","geometry":{"bounds":{"northeast":{"lat":53.7935116,"lng":-1.2468933},"southwest":{"lat":53.79284879999999,"lng":-1.2484235}},"location":{"lat":53.7930462,"lng":-1.2474083},"location_type":"APPROXIMATE","viewport":{"northeast":{"lat":53.7945291802915,"lng":-1.246309419708498},"southwest":{"lat":53.7918312197085,"lng":-1.249007380291502}}},"place_id":"ChIJuW5dVJhAeUgRB8Ahx3EhB88","types":["postal_code"]}],"status":"OK"}`));

    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.googleMapsApiKey}`;
    return this.http.get<GeocoderResponse>(url);
  }
}
