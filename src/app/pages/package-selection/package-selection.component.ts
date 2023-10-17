import { ApexOptions } from 'ng-apexcharts';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallmentsSummaryComponent } from '../installments-summary/installments-summary.component';
import { Router } from '@angular/router';
import { FormService } from '../../../shared/service/form.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { PackageDto } from '../../../shared/dto/package-dto';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'page-package-selection',
  templateUrl: './package-selection.component.html',
  styleUrls: ['./package-selection.component.scss']
})
export class PackageSelectionComponent {
  packages: PackageDto[];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(public dialog: MatDialog, private onlineEnquiryService: OnlineEnquiryService, private router: Router, public formService: FormService) {


    this.chartOptions ={
      series: [
      {
        name: 'Consumption',
        group: 'cons',
        data: [44000, 55000, 41000, 67000, 22000, 43000,44000, 55000, 41000, 67000, 22000, 43000]
      },
      {
        name: 'Prodcution',
        group: 'prod',
        data: [48000, 50000, 40000, 65000, 25000, 40000,44000, 55000, 41000, 67000, 22000, 43000]
      }
    ],
      chart: {
      type: 'bar',
      height: 300,
      stacked: false,
    },
    stroke: {
      width: 1,
      colors: ['']
    },
    dataLabels: {
      // formatter: (val:any) => {
      //   return val / 1000 + 'KWh'
      // }
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      labels: {
        style: {
          colors: 'white',
        }
      }
    },
    fill: {
      opacity: 1
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val / 200 + 'KWh'
        },
        style: {
          colors: ["white"],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: 'white', // Set your desired color here
      }
    },
    };


  }

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
