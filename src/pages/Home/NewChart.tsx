import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

export default function RadiaBarExample() {
  let primary = '#7367F0';
  let primaryLight = '#9c8cfc';
  let brown = '#8D6E63';
  let brownLight = '#DBAE8E';

  //   const [data, setData] = useState([
  //     {
  //       name: '35-39',
  //       uv: 8.22,
  //       pv: 9800,
  //       fill: brown,
  //     },
  //     {
  //       name: '40-49',
  //       uv: 8.63,
  //       pv: 3908,
  //       fill: primary,
  //     },
  //   ]);

  const data = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ];

  const style = {
    top: 0,
    left: 350,
    lineHeight: '24px',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>RadiaBar Chart</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="recharts-wrapper">
          <ResponsiveContainer>
            {/* <RadialBarChart
              width={500}
              height={300}
              innerRadius={20}
              outerRadius={160}
              barSize={20}
              data={data}
            >
              <RadialBar minAngle={15} background clockWise dataKey="uv" />
              <Tooltip />
            </RadialBarChart> */}
            <RadialBarChart
              width={500}
              height={300}
              cx={150}
              cy={150}
              innerRadius={20}
              outerRadius={140}
              barSize={10}
              data={data}
            >
              <RadialBar
                //@ts-ignore
                minAngle={15}
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}
