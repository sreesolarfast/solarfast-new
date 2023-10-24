import { NgModule } from '@angular/core';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SendQuoteComponent } from './components/send-quote/send-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressionBarTopComponent } from './components/progression-bar-top/progression-bar-top.component';


@NgModule({
    declarations: [
        GooglemapComponent,
        SendQuoteComponent,
        ProgressionBarTopComponent,
    ],

    imports: [
        CommonModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ProgressionBarTopComponent,
        GooglemapComponent,
        GoogleMapsModule,
        SendQuoteComponent
    ],
})

export class SharedModule {}
