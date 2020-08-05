import React from 'react';
import Chart from 'react-apexcharts';

export default function RadialChart({ series }: any) {
  let primary = '#7367F0';
  let primaryLight = '#9c8cfc';
  let brown = '#8D6E63';
  let brownLight = '#DBAE8E';

  const options = {
    colors: [primary, brown],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [primaryLight, brownLight],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    // stroke: {
    //   lineCap: 'round',
    // },
    plotOptions: {
      radialBar: {
        size: 150,
        hollow: {
          size: '40%',
        },
        track: {
          strokeWidth: '100%',
          margin: 15,
        },
        dataLabels: {
          name: {
            fontSize: '18px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            fontSize: '24px',
            label: 'Total',

            formatter: () => {
              return 42459;
            },
          },
        },
      },
    },
    labels: ['Streaming', 'Withdrawn'],
  };

  return (
    <Chart options={options} series={series} type="radialBar" height={350} />
  );
}
