import { ApexOptions } from 'ng-apexcharts';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { PackageDto } from '../../../shared/dto/package-dto';

@Component({
  selector: 'page-package-selection',
  templateUrl: './package-selection.component.html',
  styleUrls: ['./package-selection.component.scss']
})
export class PackageSelectionComponent {
  packages: PackageDto[];


//Chart
chartOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 500,
    toolbar: {
      show: true,
    },
  },
  colors : ['#000', '#fffff'],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  // xaxis: {
  //   categories: ['0 kWh', '150 kWh', '300 kWh', '450 kWh', '600 kWh'],
  // },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  series: [
    {
      name: 'Consumption',
      data: [50, 75, 80, 60, 90,50, 75, 80, 60, 90,50, 75, 120],
    },
    {
      name: 'Production',
      data: [30, 40, 50, 60, 70,30, 40, 50, 60, 70,30, 40, 50],
    },
  ],
};

  constructor(public dialog: MatDialog, private onlineEnquiryService: OnlineEnquiryService, private router: Router, public formService: FormService) {}

  ngOnInit(): void {
    const step = this.formService.getSteps().filter(x => x.component == 'page-package-selection')[0];
    if (step != this.formService.activeStep) {
      this.formService.redirectToCorrectStep();
    }

    this.onlineEnquiryService.result$
    .subscribe({
      next: (x) => {
        this.packages = x.packageOptions;
        console.log(this.packages);
      }
    })
  }

  answerGiven(value: number) {
    this.onlineEnquiryService.result.selectedPackageId = value;
    this.formService.next();
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(InstallmentsSummaryComponent, {
      width: '30%',
      height:'90%'
    });

    // Handle dialog close or other events here
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
