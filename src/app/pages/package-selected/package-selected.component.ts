import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';
import { FormStep } from '../../../shared/model/form-step';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { ApexOptions, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'page-package-selected',
  templateUrl: './package-selected.component.html',
  styleUrls: ['./package-selected.component.scss'],
})
export class PackageSelectedComponent implements OnInit {

  //Apex Charts

  chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: true,
      },
    },
    colors: ['#000', '#fffff'],
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
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    series: [
      {
        name: 'Consumption',
        data: [50, 75, 80, 60, 90, 50, 75, 80, 60, 90, 50, 75, 120],
      },
      {
        name: 'Production',
        data: [30, 40, 50, 60, 70, 30, 40, 50, 60, 70, 30, 40, 50],
      },
    ],
  };

  @Input() step: FormStep;
  @Output() newStep = new EventEmitter<number | null>();

  constructor(
    public dialog: MatDialog,
    private onlineEnquiryService: OnlineEnquiryService,
    private router: Router,
    public formService: FormService
  ) {}

  ngOnInit(): void {
    const step = this.formService
      .getSteps()
      .filter((x) => x.component == 'page-package-selected')[0];
    // if (step != this.formService.activeStep) {
    //   this.formService.redirectToCorrectStep();
    // }
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(InstallmentsSummaryComponent, {
      width: '30%',
      height: '90%',
    });

    // Handle dialog close or other events here
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isOpen = false;

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }
}
