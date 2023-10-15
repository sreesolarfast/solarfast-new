import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TerminateComponent } from './pages/terminate/terminate.component';
import { SolarfastsystemComponent } from './pages/solarfastsystem/solarfastsystem.component';
import { ChoosensystemComponent } from './pages/choosensystem/choosensystem.component';
import { PickinstallationdateComponent } from './pages/pickinstallationdate/pickinstallationdate.component';
import { ChoosesolarfastsystemComponent } from './pages/choosesolarfastsystem/choosesolarfastsystem.component';
import { CustomerdetailsentryformComponent } from './pages/customerdetailsentryform/customerdetailsentryform.component';
import { GooglemapComponent } from 'src/shared/components/googlemap/googlemap.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'postcode',
    pathMatch:'full'
  },
  {
    path:'solar',
    loadChildren: () => import('./form/form.module').then(a => a.FormModule),
  },
  {
    path:'postcode',
    loadChildren: () => import('./pages/postal-code-entry/postal-code-entry.module').then(a => a.PostalCodeEntryModule),
  },
  {
    path:'solarfastsystem',
    component: SolarfastsystemComponent
  },
  {
    path:'choosensolarfastsystem',
    component: ChoosensystemComponent
  },
  {
    path:'choosesolarfast',
    component: ChoosesolarfastsystemComponent
  },
  {
    path:'chooseinstalldate',
    component: PickinstallationdateComponent
  },
  {
    path:'customerdetails',
    component: CustomerdetailsentryformComponent
  },
  {
    path:'map',
    component: GooglemapComponent
  },
  {
    path:'terminate',
    component: TerminateComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
