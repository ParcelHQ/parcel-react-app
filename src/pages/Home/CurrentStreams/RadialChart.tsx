import React from 'react';
import Chart from 'react-apexcharts';

const primary = '#7367F0';
const primaryLight = '#9c8cfc';
const brown = '#8D6E63';
const brownLight = '#DBAE8E';

export default function RadialChart({ series, totalStreamValue }: any) {
  console.log('series:', series[0]);
  console.log('totalStreamValue:', totalStreamValue);

  if (isNaN(series[0])) series[0] = 50;

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
              return totalStreamValue ? totalStreamValue : 50;
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
