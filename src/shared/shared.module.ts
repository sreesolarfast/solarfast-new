import { NgModule } from '@angular/core';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
    declarations: [
        GooglemapComponent,
    ],

    imports: [
        GoogleMapsModule
    ],
    exports: [
        GooglemapComponent,
        GoogleMapsModule
    ],
})

export class SharedModule {}
