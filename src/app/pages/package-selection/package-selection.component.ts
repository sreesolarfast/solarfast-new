import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentSummaryComponent } from '../../../shared/components/installments-summary/installment-summary.component';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import { PackageType } from 'src/shared/enum/package-type';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'page-package-selection',
    templateUrl: './package-selection.component.html',
    styleUrls: ['./package-selection.component.scss'],
})
export class PackageSelectionComponent {
    @ViewChild('drawer', { static: true }) public drawer!: MatDrawer;
    packages: PackageDto[];
    packageType = PackageType;
    selectedPackage: PackageDto;
    dataToSendToPopup: any;

    tenureMonths = 180;
    calculations: any[] = [];
    interestRate = 11.9;

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService
    ) {}

    calculateEMI(loanAmount: number, interestRate: number, tenureMonths: number): number {
        const monthlyInterestRate = (interestRate / 100) / 12;
        const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
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
                    emi: this.calculateEMI(loan.totalCostPrice, this.interestRate, this.tenureMonths).toFixed(2)
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
        const dialogRef = this.dialog.open(InstallmentSummaryComponent, {
            panelClass: ['my-custom-class'],
            width: '40%',
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
}
