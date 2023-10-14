import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/modules/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SolarfastsystemComponent } from './pages/solarfastsystem/solarfastsystem.component';
import { ChoosesolarfastsystemComponent } from './pages/choosesolarfastsystem/choosesolarfastsystem.component';
import { ChoosensystemComponent } from './pages/choosensystem/choosensystem.component';
import { PickinstallationdateComponent } from './pages/pickinstallationdate/pickinstallationdate.component';
import { CustomerdetailsentryformComponent } from './pages/customerdetailsentryform/customerdetailsentryform.component';
import { OrderprogressComponent } from './pages/orderprogress/orderprogress.component';
import { PhotouploadComponent } from './pages/photoupload/photoupload.component';
import { OrderconfirmationComponent } from './pages/orderconfirmation/orderconfirmation.component';
import { InstallmentbillingsummaryComponent } from './pages/installmentbillingsummary/installmentbillingsummary.component';
import { AuthInterceptor } from '../shared/guards/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SolarfastsystemComponent,
    ChoosesolarfastsystemComponent,
    ChoosensystemComponent,
    PickinstallationdateComponent,
    CustomerdetailsentryformComponent,
    OrderprogressComponent,
    PhotouploadComponent,
    OrderconfirmationComponent,
    InstallmentbillingsummaryComponent,

    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
