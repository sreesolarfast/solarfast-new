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
    ApexLegend,
} from 'ng-apexcharts';

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
    styleUrls: ['./consumptionprodcutionchart.component.scss'],
})
export class ConsumptionProdcutionChartComponent {
    @ViewChild('chart') chart: ChartComponent;

    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    color: '#ccc',
                    name: 'Est. Consumption',
                    group: 'cons',
                    data: [44000, 55000, 41000, 67000, 22000, 43000, 44000, 55000, 41000, 67000, 22000, 43000],
                },
                {
                    color: '#75C043',
                    name: 'Est. Production',
                    group: 'prod',
                    data: [48000, 50000, 40000, 65000, 25000, 40000, 44000, 55000, 41000, 67000, 22000, 43000],
                },
            ],

            chart: {
                type: 'bar',
                height: 300,
                stacked: false,
                toolbar: { show: false },
            },

            stroke: {
                width: 1,
                colors: ['#ccc', '#75C043'],
            },
            dataLabels: {
                // formatter: (val:any) => {
                //   return val / 1000 + 'KWh'
                // }
                enabled: false,
            },

            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#fff',
                    },
                },
            },
            fill: {
                opacity: 1,
                colors: ['#ccc', '#75C043'],
            },

            yaxis: {
                labels: {
                    formatter: val => {
                        return val / 200 + 'KWh';
                    },
                    style: {
                        colors: ['white'],
                        fontSize: '13px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        cssClass: 'apexcharts-yaxis-label',
                    },
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                labels: {
                    colors: 'white',
                },
            },
        };
    }
}
