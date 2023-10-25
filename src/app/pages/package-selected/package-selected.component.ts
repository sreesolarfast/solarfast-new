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

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        public formService: FormService,
        private packageService: PackageService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-package-selected')[0];

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null && x.packageOptions != null) this.activePackage = x.packageOptions.filter(p => p.dtoId == x.selectedPackageId)[0];
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

                if (uniqueRef != null)
                    this.onlineEnquiryService.getByUniqueReference(uniqueRef).subscribe({
                        next: o => {
                            o.selectedPackage = x;
                            o.selectedPackageId = x.dtoId;
                            this.formService.activeStep = step;
                            this.onlineEnquiryService.result = o;
                            this.onlineEnquiryService.setStep(step.step);
                            this.location.replaceState('/pages/package-selected');
                        },
                    });
            },
        });

        if (this.formService.activeStep != null && step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(InstallmentSummaryComponent, {
            width: '30%',
            height: '90%',
            disableClose: false
        });

        // Handle dialog close or other events here
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    whatsIncluded() {
        this.drawer.open();
    }
}
