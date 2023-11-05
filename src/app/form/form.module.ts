import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
// steps
import { PropertyOwnershipComponent } from './steps/property-ownership/property-ownership.component';
import { HouseTypeComponent } from './steps/house-type/house-type.component';
import { UnitRateComponent } from './steps/unit-rate/unit-rate.component';
import { ShadingComponent } from './steps/shading/shading.component';
import { AnnualConsumptionComponent } from './steps/annual-consumption/annual-consumption.component';
import { RoofTypeComponent } from './steps/roof-type/roof-type.component';
import { SharedModule } from 'src/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        FormComponent,

        // steps
        PropertyOwnershipComponent,
        HouseTypeComponent,
        AnnualConsumptionComponent,
        UnitRateComponent,
        ShadingComponent,
        RoofTypeComponent,
    ],
    imports: [CommonModule, FormRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, SharedModule],
})
export class FormModule {}
