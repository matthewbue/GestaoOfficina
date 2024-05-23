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

export const chartOptionsSemana: Partial<ChartOptions> = {
  series: [
    {
      name: "Aguardando Início",
      data: [44, 55, 41, 67, 22, 43, 30]
    },
    {
      name: "Em Andamento",
      data: [13, 23, 20, 8, 13, 27, 15]
    },
    {
      name: "Aguardando Cliente",
      data: [11, 17, 15, 15, 21, 14, 18]
    },
    {
      name: "Concluído",
      data: [21, 7, 25, 13, 22, 8, 10]
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
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  },
  legend: {
    position: "right",
    offsetY: 40
  },
  fill: {
    opacity: 1
  }
};

export const chartOptions2Semana: Partial<ChartOptions2> = {
  series: [
    {
      name: "Ordem de serviço",
      data: [45, 52, 38, 24, 33, 26, 21]
    },
    {
      name: "Orçamento",
      data: [35, 41, 62, 42, 13, 18, 29]
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
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  },
  grid: {
    borderColor: "#f1f1f1"
  }
};
