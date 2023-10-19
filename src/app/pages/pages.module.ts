import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { InstallDateComponent } from './install-date/install-date.component';
import { OfflineComponent } from './offline/offline.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { PackageSelectedComponent } from './package-selected/package-selected.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConsumptionprodcutionchartComponent } from './consumptionprodcutionchart/consumptionprodcutionchart.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgApexchartsModule
  ],
  declarations: [
    ConfirmOrderComponent,
    InstallDateComponent,
    OfflineComponent,
    PackageSelectionComponent,
    PackageSelectedComponent,
    ConsumptionprodcutionchartComponent
]
})
export class PagesModule { }
