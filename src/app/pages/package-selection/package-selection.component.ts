import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentSummaryComponent } from '../../../shared/components/installments-summary/installment-summary.component';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import { PackageType } from 'src/shared/enum/package-type';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { SendQuoteComponent } from '../../../shared/components/send-quote/send-quote.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'page-package-selection',
    templateUrl: './package-selection.component.html',
    styleUrls: ['./package-selection.component.scss'],
    animations: [
        trigger('fadeIn', [
            state('void', style({ opacity: 0 })), // Initial state (invisible)
            transition(':enter', [animate('100ms')]), // Transition to visible when added to the DOM
        ]),
    ],
})
export class PackageSelectionComponent {
    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
    packages: PackageDto[];
    packageType = PackageType;
    selectedPackage: PackageDto;
    dataToSendToPopup: any;
    environment = environment;

    tenureMonths = 180;
    calculations: any[] = [];
    interestRate = 11.9;

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService
    ) {}

    calculateEMI(loanAmount: number, interestRate: number, tenureMonths: number): number {
        const depositAmount = (50/100) * loanAmount;
        const loanCost = loanAmount - depositAmount;
        const monthlyInterestRate = (interestRate / 12) / 100;
        const emi = (loanCost * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
        return emi;
      }

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-package-selection')[0];
        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }

        this.onlineEnquiryService.result$.subscribe({
            next: x => {


                // x.packageOptions.forEach(item => {
                //     if (item?.imageDtos?.length > 0) item.type = PackageType.Recommended;
                // });

                this.packages = x.packageOptions;

                this.packages = this.packages.map(loan => ({
                    ...loan,
                    emi: this.calculateEMI(loan.totalSalePrice, this.interestRate, this.tenureMonths).toFixed(2)
                  }));
            },
        });
    }

    answerGiven(value: number) {
        this.onlineEnquiryService.result.selectedPackageId = value;
        this.onlineEnquiryService.result.selectedPackage = this.packages.filter(x => x.dtoId == value)[0];
        this.formService.next();
    }

    openPopup(item): void {
        const isMobile = window.innerWidth < 600; // Define your breakpoint for mobile here
        const isTablet = window.innerWidth >= 600 && window.innerWidth < 1024; // Define your breakpoint for tablet here
        let dialogRefWidth = '40%'; // Default width for larger screens
        if (isMobile) {
            dialogRefWidth = '90%'; // Custom width for mobile devices
        } else if (isTablet) {
            dialogRefWidth = '70%'; // Custom width for tablet devices
        }

        const dialogRef = this.dialog.open(InstallmentSummaryComponent, {
            panelClass: ['my-custom-class'],
            width: dialogRefWidth,
            height: 'auto',
            maxHeight: '90vh',
            disableClose: false,
            data: item
        });
    }

    whatsIncluded(item: PackageDto) {
        this.selectedPackage = item;
        this.drawer.open();
    }

    sendQuote(packageId: number)  {
        const dialog = this.dialog.open(SendQuoteComponent, {
            height: 'auto',
            maxHeight: '90vh',
            disableClose: false,
            data: packageId
        });
    }
}
