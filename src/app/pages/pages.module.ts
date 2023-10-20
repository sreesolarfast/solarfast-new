import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { InstallDateComponent } from './install-date/install-date.component';
import { OfflineComponent } from './offline/offline.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { PackageSelectedComponent } from './package-selected/package-selected.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { MapComponent } from './map/map.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WhatincludedComponent } from '../whatincluded/whatincluded.component';
import { ConsumptionProdcutionChartComponent } from './consumptionprodcutionchart/consumptionprodcutionchart.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WhatsincludedComponent } from './whatsincluded/whatsincluded.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgApexchartsModule,
    SharedModule,
    MaterialModule

  ],
  declarations: [
    ConfirmOrderComponent,
    InstallDateComponent,
    OfflineComponent,
    PackageSelectionComponent,
    PackageSelectedComponent,
    WhatincludedComponent,
    ConsumptionProdcutionChartComponent,
    MapComponent,
    WhatsincludedComponent,
]
})
export class PagesModule { }
