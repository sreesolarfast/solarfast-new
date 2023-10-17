import { Component, ViewChild } from '@angular/core';
import { ApexOptions, ChartType } from 'ng-apexcharts';
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
  selector: 'app-solarfastsystem',
  templateUrl: './solarfastsystem.component.html',
  styleUrls: ['./solarfastsystem.component.scss']
})
export class SolarfastsystemComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
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
}
