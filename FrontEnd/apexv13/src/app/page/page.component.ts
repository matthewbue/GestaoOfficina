import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/Account/account.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  fullname: string = "Damon";
  chartConfiguration: any;
  chartOptions: Partial<ChartOptions>;
  chartOptions2: Partial<ChartOptions2>;


  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getUserAuthenticaded();
    // this.fullname = localStorage.getItem("fullname");

    let situacaoSenha = localStorage.getItem("situacaoSenha");
    if (situacaoSenha == '1') {
      this.router.navigate(['/pages/forgot-password'])
    }

    this.chartOptions2 = {
      series: [
        {
          name: "Ordem de serviço",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Orçamento",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 5,
        curve: "smooth",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Page Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val) {
                return val + "";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val + "";
              }
            }
          },
          {
            title: {
              formatter: function(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1",
        
      }
    };

    this.chartOptions = {
      series: [
        {
          name: "Aguardando Início",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "Em Andamento",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "Aguardando Cliente",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "Concluído",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"

        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };



    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Aguardando início",
    //       data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    //     },
    //     {
    //       name: "Em andamento",
    //       data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    //     },
    //     {
    //       name: "Aguardando cliente",
    //       data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    //     },
    //     {
    //       name: "Concluído",
    //       data: [10, 27, 50, 80, 70, 30, 50, 40, 60, 46, 35, 37]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line"
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     width: 5,
    //     curve: "straight",
    //     dashArray: [0, 8, 5]
    //   },
    //   title: {
    //     text: "Page Statistics",
    //     align: "left"
    //   },
    //   legend: {
    //     tooltipHoverFormatter: function (val, opts) {
    //       return (
    //         val +
    //         " - <strong>" +
    //         opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
    //         "</strong>"
    //       );
    //     }
    //   },
    //   markers: {
    //     size: 0,
    //     hover: {
    //       sizeOffset: 6
    //     }
    //   },
    //   xaxis: {
    //     labels: {
    //       trim: false
    //     },
    //     categories: [
    //       "01 Jan",
    //       "02 Jan",
    //       "03 Jan",
    //       "04 Jan",
    //       "05 Jan",
    //       "06 Jan",
    //       "07 Jan",
    //       "08 Jan",
    //       "09 Jan",
    //       "10 Jan",
    //       "11 Jan",
    //       "12 Jan"
    //     ]
    //   },
    //   tooltip: {
    //     y: [
    //       {
    //         title: {
    //           formatter: function (val) {
    //             return val + " (mins)";
    //           }
    //         }
    //       },
    //       {
    //         title: {
    //           formatter: function (val) {
    //             return val + " per session";
    //           }
    //         }
    //       },
    //       {
    //         title: {
    //           formatter: function (val) {
    //             return val;
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   grid: {
    //     borderColor: "#f1f1f1"
    //   }
    // };
  }

}
