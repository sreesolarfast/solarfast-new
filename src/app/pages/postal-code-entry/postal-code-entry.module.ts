import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { PostalCodeEntryRoutingModule } from './postal-code-entry-routing.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PostalCodeEntryComponent } from './postal-code-entry.component';




@NgModule({
  declarations: [
    PostalCodeEntryComponent,
  ],
  imports: [
    CommonModule,
    PostalCodeEntryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class PostalCodeEntryModule { }
