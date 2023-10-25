import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import { PackageType } from 'src/shared/enum/package-type';
import { WhatsincludedComponent } from '../whatsincluded/whatsincluded.component';

@Component({
    selector: 'page-package-selection',
    templateUrl: './package-selection.component.html',
    styleUrls: ['./package-selection.component.scss'],
})
export class PackageSelectionComponent {
    packages: PackageDto[];
    packageType = PackageType;
    isOpen = false;
    getItemData = ""
    @ViewChild(WhatsincludedComponent) ChildComponent;
    dataToSendToPopup: any;
    tenureMonths = 120;
    calculations: any[] = [];
    interestRate = 11.9;

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService
    ) {

    }
    calculateEMI(loanAmount: number, interestRate: number, tenureMonths: number): number {
      const monthlyInterestRate = (interestRate / 100) / 12;
      const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenureMonths));
      return emi;
    }

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-package-selection')[0];
        // if (step != this.formService.activeStep) {
        //     this.formService.redirectToCorrectStep();
        // }

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

                console.log(this.packages, "::::::::::::::")

            },
        });
    }

    answerGiven(value: number) {
        this.onlineEnquiryService.result.selectedPackageId = value;
        this.onlineEnquiryService.result.selectedPackage = this.packages.filter(x => x.dtoId == value)[0];
        this.formService.next();
    }

    openPopup(item): void {
        const dialogRef = this.dialog.open(InstallmentsSummaryComponent, {
            width: '30%',
            height: '90%',
            data: item
        });

        // Handle dialog close or other events here
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    toggleSidenav(item) {
        this.isOpen = !this.isOpen;
        this.ChildComponent.childMethod(item);
    }
}
