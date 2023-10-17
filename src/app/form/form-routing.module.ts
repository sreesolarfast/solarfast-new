import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { GooglemapComponent } from '../../shared/components/googlemap/googlemap.component';
import { OfflineComponent } from '../pages/offline/offline.component';
import { PostalCodeGuard } from '../../shared/guards/postalcode/postalcode-auth.guard';
import { TerminateComponent } from '../pages/terminate/terminate.component';


const routes: Routes = [

  {
    path: '',
    component: FormComponent,
    canActivate:[PostalCodeGuard],
    // resolve: {
    //   enquiry: OnlineEnquiryAddResolver
    // }
    children: [
      {
        path: ':id',
        component: FormComponent,
        // canActivate:[PostalCodeGuard]
      },
      { path: 'googlemap', component: GooglemapComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {
}
