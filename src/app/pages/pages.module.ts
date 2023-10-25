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
import { ThankYouComponent } from './thank-you/thank-you.component';
import { TerminateComponent } from './terminate/terminate.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule

  ],
  declarations: [
    ConfirmOrderComponent,
    InstallDateComponent,
    OfflineComponent,
    PackageSelectionComponent,
    PackageSelectedComponent,
    MapComponent,
    ThankYouComponent,
    TerminateComponent,
    PhotoUploadComponent,
    NextStepsComponent,
    OrderConfirmationComponent,
]
})
export class PagesModule { }
