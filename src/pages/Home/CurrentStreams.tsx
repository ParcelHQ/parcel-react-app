import React, { useState, useEffect } from 'react';
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
import { ChevronDown, ArrowUp, ArrowDown } from 'react-feather';
import { Row, Col } from 'reactstrap';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import Sablier from '../../abis/Sablier.json';

let primary = '#7367F0';
let primaryLight = '#9c8cfc';
let brown = '#8D6E63';
let brownLight = '#DBAE8E';

export default function ProductOrders() {
  const { library, account } = useWeb3React<Web3Provider>();
  const SablierContract = useContract(
    addresses[RINKEBY_ID].sablier,
    Sablier,
    true
  );

  console.log('SablierContract:', SablierContract);

  //make a call to factory contract to get all ID's, then call getSalary
  // Purple - Total cumulative stream of pepople
  // Brown - Withdrawn amount

  useEffect(() => {
    (async () => {
      if (SablierContract) {
        // call getSalary for each employee
        // percentage = (NOW (unix) - start time * rate) / salary
        // if 100% turn graph color to green and stop running logic
        let result = await SablierContract.getSalary('171');
        console.log('result:', result);
      }
    })();

    return () => {};
  }, [SablierContract]);

  const [options] = useState({
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
          // total: {
          //   show: true,
          //   label: 'Total',

          //   formatter: () => {
          //     return 42459;
          //   },
          // },
        },
      },
    },
    labels: ['Finished', 'Pending'],
  });
  const [series] = useState([70, 52]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Streams</CardTitle>
        {/* <UncontrolledDropdown>
          <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
            All <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>All</DropdownItem>
            <DropdownItem>Finance</DropdownItem>
            <DropdownItem>Engineering</DropdownItem>
            <DropdownItem>Marketing</DropdownItem>
            <DropdownItem>HR</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </CardHeader>
      <CardBody>
        <Row className="pb-50">
          <Col
            lg="6"
            xs="12"
            className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
          >
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={350}
            />
          </Col>
          <Col
            lg="6"
            xs="12"
            className="d-flex justify-content-between flex-column text-right"
          >
            <div className="d-flex justify-content-between mb-25">
              <div className="browser-info">
                <p className="mb-25">Tarun.eth</p>
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
                <p className="mb-25">Anubhav.eth</p>
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
                <p className="mb-25">Brennan.eth</p>
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
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
