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
  selector: 'app-consumptionprodcutionchart',
  templateUrl: './consumptionprodcutionchart.component.html',
  styleUrls: ['./consumptionprodcutionchart.component.scss']
})
export class ConsumptionprodcutionchartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
  this.chartOptions ={
    series: [
    {
      name: 'Consumption',
      group: 'budget',
      data: [44000, 55000, 41000, 67000, 22000, 43000,44000, 55000, 41000, 67000, 22000, 43000]
    },
    {
      name: 'Prodcution',
      group: 'actual',
      data: [48000, 50000, 40000, 65000, 25000, 40000,44000, 55000, 41000, 67000, 22000, 43000]
    }
  ],
    chart: {
    type: 'bar',
    height: 350,
    stacked: false,
  },
  stroke: {
    width: 1,
    colors: ['#fff']
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
    ]
  },
  fill: {
    opacity: 1
  },
  // colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
  yaxis: {
    labels: {
      formatter: (val) => {
        return val / 200 + 'KWh'
      },
      style: {
        colors: ["green"],
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        cssClass: 'apexcharts-yaxis-label',
      },
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  }
  };
  }
}
