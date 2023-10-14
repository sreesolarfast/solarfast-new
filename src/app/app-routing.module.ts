import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TerminateComponent } from './pages/terminate/terminate.component';

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
    path:'terminate',
    component: TerminateComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
