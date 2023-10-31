import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentSummaryComponent } from '../../../shared/components/installments-summary/installment-summary.component';
import { FormStep } from '../../../shared/model/form-step';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { PackageService } from '../../../shared/service/package.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import { Location } from '@angular/common';
import { PackageType } from 'src/shared/enum/package-type';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { SendQuoteComponent } from '../../../shared/components/send-quote/send-quote.component';

@Component({
    selector: 'page-package-selected',
    templateUrl: './package-selected.component.html',
    styleUrls: ['./package-selected.component.scss'],
})
export class PackageSelectedComponent implements OnInit {
    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
    @Input() step: FormStep;
    @Output() newStep = new EventEmitter<number | null>();
    activePackage: PackageDto;
    packageType = PackageType;
    dataToSendToPopup: any;

    tenureMonths = 180;
    calculations: any[] = [];
    interestRate = 11.9;
    environment = environment;

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService,
        private packageService: PackageService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    calculateEMI(loanAmount: number, interestRate: number, tenureMonths: number): number {
        const depositAmount = (50/100) * loanAmount;
        const loanCost = loanAmount - depositAmount;
        const monthlyInterestRate = (interestRate / 12) / 100;
        const emi = (loanCost * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
        return emi;
      }


    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-package-selected')[0];


        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null && x.packageOptions == null)  return;

                this.activePackage = x.packageOptions.filter(p => p.dtoId == x.selectedPackageId)[0];
                this.activePackage.emi = this.calculateEMI(this.activePackage.totalSalePrice, this.interestRate, this.tenureMonths).toFixed(2);
            },
        });

        let uniqueRef = null;
        this.route.paramMap.subscribe(x => {
            uniqueRef = x.get('uniqueReference');
        });

        this.packageService.result$?.subscribe({
            next: x => {
                if (x == null) return;
                this.activePackage = x;
            },
        });

        if (uniqueRef != null)
        this.onlineEnquiryService.getByUniqueReference(uniqueRef).subscribe({
            next: o => {
                if (o == null) return;
                o.selectedPackage = this.activePackage;
                o.selectedPackageId = this.activePackage.dtoId;
                o.selectedPackage.emi = this.calculateEMI(this.activePackage.totalSalePrice, this.interestRate, this.tenureMonths).toFixed(2);
                this.formService.activeStep = step;
                this.onlineEnquiryService.setOnlineEnquiry(o);
                this.activePackage = o.selectedPackage;
                this.onlineEnquiryService.setStep(step.step);
                this.location.replaceState('/pages/package-selected');
            },
        });

        if (this.formService.activeStep != null && step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }
    }

    openPopup(item): void {
        const dialogRef = this.dialog.open(InstallmentSummaryComponent, {
            panelClass: ['my-custom-class'],
            width: '40%',
            height: 'auto',
            maxHeight: '90vh',
            disableClose: false,
            data: item
        });
    }

    whatsIncluded() {
        this.drawer.open();
    }

    sendQuote(packageId: number)  {
        const dialog = this.dialog.open(SendQuoteComponent, {
            data: packageId
        });
    }
}
