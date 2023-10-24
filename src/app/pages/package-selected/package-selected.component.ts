import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';
import { FormStep } from '../../../shared/model/form-step';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { PackageService } from '../../../shared/service/package.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import { OnlineEnquiryDto } from '../../../shared/dto/online-enquiry-dto';

@Component({
    selector: 'page-package-selected',
    templateUrl: './package-selected.component.html',
    styleUrls: ['./package-selected.component.scss'],
})
export class PackageSelectedComponent implements OnInit {
    @Input() step: FormStep;
    @Output() newStep = new EventEmitter<number | null>();
    activePackage: PackageDto;

    constructor(
        public dialog: MatDialog,
        private onlineEnquiryService: OnlineEnquiryService,
        private router: Router,
        public formService: FormService,
        private packageService: PackageService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-package-selected')[0];

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x != null) this.activePackage = x.selectedPackage;
            },
        });


        this.packageService.result$.subscribe({
            next: x => {
                if (x == null) return;

                const postcode = this.route.snapshot.queryParamMap.get('postcode');
                const companyId = this.route.snapshot.queryParamMap.get('companyId');
                const repId = this.route.snapshot.queryParamMap.get('repId');
                const uniqueRef = this.route.snapshot.queryParamMap.get('uniqueReference');

                let dto = { postcode: postcode } as OnlineEnquiryDto;
                if (companyId != null) dto.companyId = +companyId;
                if (repId != null) dto.repId = repId;

                // we have come in through a package selected by id route
                dto.selectedPackageId = x.dtoId;
                dto.selectedPackage = x;
                this.formService.activeStep = step;
                this.activePackage = x;

                this.onlineEnquiryService.result = dto;
            },
        });

        if (step != this.formService.activeStep) {
            this.formService.redirectToCorrectStep();
        }
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(InstallmentsSummaryComponent, {
            width: '30%',
            height: '90%',
        });

        // Handle dialog close or other events here
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    toggleSidenav() {}
}
