import { Component } from '@angular/core';
import { ApexOptions, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-consumptionprodcutionchart',
  templateUrl: './consumptionprodcutionchart.component.html',
  styleUrls: ['./consumptionprodcutionchart.component.scss']
})
export class ConsumptionprodcutionchartComponent {
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

}
