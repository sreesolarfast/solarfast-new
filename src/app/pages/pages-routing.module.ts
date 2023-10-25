import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PackageSelectedComponent } from './package-selected/package-selected.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { OfflineComponent } from './offline/offline.component';
import { TerminateComponent } from './terminate/terminate.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { InstallDateComponent } from './install-date/install-date.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { PostalCodeGuard } from '../../shared/guards/postalcode/postalcode-auth.guard';
import { MapComponent } from './map/map.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { packageResolver } from '../../shared/resolver/package.resolver';
import { onlineEnquiryResolver } from '../../shared/resolver/online-enquiry.resolver';

const routes: Routes = [
    { path: 'package-selection', component: PackageSelectionComponent, canActivate: [PostalCodeGuard] },
    { path: 'package-selected', component: PackageSelectedComponent, canActivate: [PostalCodeGuard] },
    { path: 'package-selected/:id/:uniqueReference', component: PackageSelectedComponent, canActivate: [PostalCodeGuard], resolve: { data: packageResolver, enquiry: onlineEnquiryResolver } },
    { path: 'confirm-order', component: OrderConfirmationComponent, canActivate: [PostalCodeGuard] },
    { path: 'install-date', component: InstallDateComponent, canActivate: [PostalCodeGuard] },
    { path: 'next-steps', component: NextStepsComponent, canActivate: [PostalCodeGuard] },
    { path: 'thank-you', component: ThankYouComponent, canActivate: [PostalCodeGuard] },
    { path: 'terminate', component: TerminateComponent },
    { path: 'offline', component: OfflineComponent },
    { path: 'photo-upload', component: PhotoUploadComponent, canActivate: [PostalCodeGuard] },
    { path: 'map', component: MapComponent, canActivate: [PostalCodeGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
