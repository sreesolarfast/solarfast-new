import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PackageSelectedComponent } from './package-selected/package-selected.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { OfflineComponent } from './offline/offline.component';
import { TerminateComponent } from './terminate/terminate.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { OrderconfirmationComponent } from './orderconfirmation/orderconfirmation.component';
import { InstallDateComponent } from './install-date/install-date.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { PostalCodeGuard } from '../../shared/guards/postalcode/postalcode-auth.guard';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    { path: 'package-selection', component: PackageSelectionComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'package-selected', component: PackageSelectedComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'confirm-order', component: OrderconfirmationComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'install-date', component: InstallDateComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'next-steps', component: NextStepsComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'terminate', component: TerminateComponent },
    { path: 'offline', component: OfflineComponent },
    { path: 'photo-upload', component: PhotoUploadComponent,
    canActivate:[PostalCodeGuard], },
    { path: 'map', component: MapComponent,
    canActivate:[PostalCodeGuard], },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
