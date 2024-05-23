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

export const chartOptionsHoje: Partial<ChartOptions> = {
  series: [
    {
      name: "Aguardando Início",
      data: [10]
    },
    {
      name: "Em Andamento",
      data: [5]
    },
    {
      name: "Aguardando Cliente",
      data: [2]
    },
    {
      name: "Concluído",
      data: [8]
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
    categories: ["Hoje"]
  },
  legend: {
    position: "right",
    offsetY: 40
  },
  fill: {
    opacity: 1
  }
};

export const chartOptions2Hoje: Partial<ChartOptions2> = {
  series: [
    {
      name: "Ordem de serviço",
      data: [10]
    },
    {
      name: "Orçamento",
      data: [15]
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
    categories: ["Hoje"]
  },
  grid: {
    borderColor: "#f1f1f1"
  }
};
