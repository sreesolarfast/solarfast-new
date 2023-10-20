import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/modules/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SolarfastsystemComponent } from './pages/solarfastsystem/solarfastsystem.component';
import { NextStepsComponent } from './pages/next-steps/next-steps.component';
import { PhotoUploadComponent } from './pages/photo-upload/photo-upload.component';
import { OrderconfirmationComponent } from './pages/orderconfirmation/orderconfirmation.component';
import { InstallmentbillingsummaryComponent } from './pages/installmentbillingsummary/installmentbillingsummary.component';
import { AuthInterceptor } from '../shared/guards/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstallmentsSummaryComponent } from './pages/installments-summary/installments-summary.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SolarfastsystemComponent,
    NextStepsComponent,
    PhotoUploadComponent,
    OrderconfirmationComponent,
    InstallmentbillingsummaryComponent,
    InstallmentsSummaryComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    GoogleMapsModule,
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
