import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglemapComponent } from '../../shared/components/googlemap/googlemap.component';

// steps
import { PropertyOwnershipComponent } from './steps/property-ownership/property-ownership.component';
import { HouseTypeComponent } from './steps/house-type/house-type.component';
import { UnitRateComponent } from './steps/unit-rate/unit-rate.component';
import { ShadingComponent } from './steps/shading/shading.component';
import { AnnualConsumptionComponent } from './steps/annual-consumption/annual-consumption.component';
import { RoofTypeComponent } from './steps/roof-type/roof-type.component';



@NgModule({
  declarations: [FormComponent, GooglemapComponent

    // steps
  , PropertyOwnershipComponent, HouseTypeComponent, AnnualConsumptionComponent, UnitRateComponent, ShadingComponent, RoofTypeComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class FormModule { }
