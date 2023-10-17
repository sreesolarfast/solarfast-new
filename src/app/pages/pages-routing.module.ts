import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PackageSelectedComponent } from './package-selected/package-selected.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { OfflineComponent } from './offline/offline.component';
import { TerminateComponent } from './terminate/terminate.component';
import { NextStepsComponent } from './next-steps/next-steps.component';


const routes: Routes = [

  { path: 'package-selection', component: PackageSelectionComponent },
  { path: 'package-selected', component: PackageSelectedComponent },
  { path: 'confirm-order', component: ConfirmOrderComponent },
  { path: 'next-steps', component: NextStepsComponent },
  { path: 'terminate', component: TerminateComponent },
  { path: 'offline', component: OfflineComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
