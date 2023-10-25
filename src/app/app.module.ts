import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../shared/guards/http.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    GoogleMapsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },
  { provide: LOCALE_ID, useValue: 'en-GB' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
