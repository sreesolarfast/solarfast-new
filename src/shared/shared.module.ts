import { NgModule } from '@angular/core';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SendQuoteComponent } from './components/send-quote/send-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressionBarTopComponent } from './components/progression-bar-top/progression-bar-top.component';
import { FaqComponent } from './components/faq/faq.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WhatsIncludedProductComponent } from './components/whats-included-product/whats-included-product.component';
import { WhatsincludedComponent } from './components/whatsincluded/whatsincluded.component';
import { SavingsProjectionsComponent } from './components/savings-projections/savings-projections.component';
import { ConsumptionProdcutionChartComponent } from '../app/pages/consumptionprodcutionchart/consumptionprodcutionchart.component';
import { GetInTouchComponent } from './components/get-in-touch/get-in-touch.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NeedHelpComponent } from './components/need-help/need-help.component';
import { InstallmentSummaryComponent } from './components/installments-summary/installment-summary.component';
import { MaterialModule } from './modules/material.module';

const importAndExport = [
    ProgressionBarTopComponent,
    GooglemapComponent,
    SendQuoteComponent,
    FaqComponent,
    WhatsincludedComponent,
    WhatsIncludedProductComponent,
    SavingsProjectionsComponent,
    ConsumptionProdcutionChartComponent,
    GetInTouchComponent,
    ContactUsComponent,
    NeedHelpComponent,
    InstallmentSummaryComponent,
    PageFooterComponent
];

@NgModule({
    declarations: [
    importAndExport
    ],

    imports: [CommonModule, GoogleMapsModule, ReactiveFormsModule, FormsModule, NgApexchartsModule, MaterialModule],
    exports: [importAndExport, GoogleMapsModule],
})
export class SharedModule {}
