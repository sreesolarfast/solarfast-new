import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { InvalidPostcodeComponent } from './invalid-postcode/invalid-postcode.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
  ],
  declarations: [
    InstallDateComponent,
    OfflineComponent,
    PackageSelectionComponent,
    PackageSelectedComponent,
    MapComponent,
    ThankYouComponent,
    TerminateComponent,
    PhotoUploadComponent,
    NextStepsComponent,
    ConfirmOrderComponent,
    InvalidPostcodeComponent
]
})
export class PagesModule { }
