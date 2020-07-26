import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Progress,
} from 'reactstrap';
import Chart from 'react-apexcharts';
import { Circle, ChevronDown, ArrowUp, ArrowDown } from 'react-feather';

let primary = '#7367F0';
let warning = '#FF9F43';
let danger = '#EA5455';
let primaryLight = '#9c8cfc';
let warningLight = '#FFC085';
let dangerLight = '#f29292';

export default function ProductOrders() {
  const [options] = useState({
    colors: [primary, warning, danger],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [primaryLight, warningLight, dangerLight],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    plotOptions: {
      radialBar: {
        size: 150,
        hollow: {
          size: '20%',
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
            label: 'Total',

            formatter: () => {
              return 42459;
            },
          },
        },
      },
    },
    labels: ['Finished', 'Pending', 'Rejected'],
  });
  const [series] = useState([70, 52, 26]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Streams</CardTitle>
        <UncontrolledDropdown>
          <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
            All <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>All</DropdownItem>
            <DropdownItem>Finance</DropdownItem>
            <DropdownItem>Engineering</DropdownItem>
            <DropdownItem>Marketing</DropdownItem>
            <DropdownItem>Sales</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={350}
        />
        <div className="chart-info d-flex justify-content-between mb-1">
          <div className="series-info d-flex align-items-center">
            <Circle strokeWidth={5} size="12" className="primary" />
            <span className="text-bold-600 ml-50">Finished</span>
          </div>
          <div className="series-result">
            <span className="align-middle">23043</span>
          </div>
        </div>
        <div className="chart-info d-flex justify-content-between mb-1">
          <div className="series-info d-flex align-items-center">
            <Circle strokeWidth={5} size="12" className="warning" />
            <span className="text-bold-600 ml-50">Pending</span>
          </div>
          <div className="series-result">
            <span className="align-middle">14658</span>
          </div>
        </div>
        <div className="chart-info d-flex justify-content-between">
          <div className="series-info d-flex align-items-center">
            <Circle strokeWidth={5} size="12" className="danger" />
            <span className="text-bold-600 ml-50">Rejected</span>
          </div>
          <div className="series-result">
            <span className="align-middle">4758</span>
          </div>
        </div>
      </CardBody>
      <Card>
        <CardHeader>
          <CardTitle>Individual Breakdown</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <p className="mb-25">Google Chrome</p>
              <h4>73%</h4>
            </div>
            <div className="stastics-info text-right">
              <span>
                800 <ArrowUp size={15} className="text-success" />
              </span>
              <span className="text-muted d-block">13:16</span>
            </div>
          </div>
          <Progress className="mb-2" value="73" />
          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <p className="mb-25">Opera</p>
              <h4>8%</h4>
            </div>
            <div className="stastics-info text-right">
              <span>
                -200 <ArrowDown size={15} className="text-danger" />
              </span>
              <span className="text-muted d-block">13:16</span>
            </div>
          </div>
          <Progress className="mb-2" value="8" />

          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <p className="mb-25">Firefox</p>
              <h4>19%</h4>
            </div>
            <div className="stastics-info text-right">
              <span>
                100 <ArrowUp size={15} className="text-success" />
              </span>
              <span className="text-muted d-block">13:16</span>
            </div>
          </div>
          <Progress className="mb-2" value="19" />

          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <p className="mb-25">Internet Explorer</p>
              <h4>27%</h4>
            </div>
            <div className="stastics-info text-right">
              <span>
                -450 <ArrowDown size={15} className="text-danger" />
              </span>
              <span className="text-muted d-block">13:16</span>
            </div>
          </div>
          <Progress className="mb-2" value="27" />
        </CardBody>
      </Card>
    </Card>
  );
}
