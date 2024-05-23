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

export const chartOptionsMes: Partial<ChartOptions> = {
  series: [
    {
      name: "Aguardando Início",
      data: [44, 55, 41, 67, 22, 43, 30, 54, 45, 61, 20, 33, 29, 34, 55, 41, 67, 22, 43, 30, 54, 45, 61, 20, 33, 29, 34, 55, 41, 67, 22]
    },
    {
      name: "Em Andamento",
      data: [13, 23, 20, 8, 13, 27, 15, 12, 21, 32, 20, 8, 13, 27, 15, 12, 21, 32, 20, 8, 13, 27, 15, 12, 21, 32, 20, 8, 13, 27, 15]
    },
    {
      name: "Aguardando Cliente",
      data: [11, 17, 15, 15, 21, 14, 18, 13, 15, 19, 15, 15, 21, 14, 18, 13, 15, 19, 15, 15, 21, 14, 18, 13, 15, 19, 15, 15, 21, 14, 18]
    },
    {
      name: "Concluído",
      data: [21, 7, 25, 13, 22, 8, 10, 21, 14, 18, 15, 13, 22, 8, 10, 21, 14, 18, 15, 13, 22, 8, 10, 21, 14, 18, 15, 13, 22, 8, 10]
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
  xaxis: {
    type: "category",
    categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  },
  legend: {
    position: "right",
    offsetY: 40
  },
  fill: {
    opacity: 1
  }
};

export const chartOptions2Mes: Partial<ChartOptions2> = {
  series: [
    {
      name: "Ordem de serviço",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10, 12, 14, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
    },
    {
      name: "Orçamento",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82]
    }
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
  xaxis: {
    categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  },
  grid: {
    borderColor: "#f1f1f1"
  }
};
