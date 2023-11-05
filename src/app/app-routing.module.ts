import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
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
    path:'**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
