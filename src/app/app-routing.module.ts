import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TerminateComponent } from './pages/terminate/terminate.component';
import { InstallDateComponent } from './pages/install-date/install-date.component';
import { GooglemapComponent } from 'src/shared/components/googlemap/googlemap.component';
import { PostalCodeEntryComponent } from './pages/postal-code-entry/postal-code-entry.component';
import { PackageSelectedComponent } from './pages/package-selected/package-selected.component';
import { PackageSelectionComponent } from './pages/package-selection/package-selection.component';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'solar',
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
    path:'pages',
    loadChildren: () => import('./pages/pages.module').then(a => a.PagesModule),
  },

  {
    path:'chooseinstalldate',
    component: InstallDateComponent
  },

  {
    path:'map',
    component: GooglemapComponent
  },

  {
    path:'terminate',
    component: TerminateComponent
  },
  {
    path:'**',
    component: PostalCodeEntryComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
