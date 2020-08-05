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
  Row,
  Col,
} from 'reactstrap';
import parcel from 'parcel-sdk';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import EmployeeList from './EmployeeList';
import { getSignature } from '../../utility';
import { shortenAddress } from '../../utility';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import Sablier from '../../abis/Sablier.json';
import ParcelWallet from '../../abis/ParcelWallet.json';
import RadialChart from './RadialChart';

export default function ProductOrders() {
  const { library } = useWeb3React<Web3Provider>();
  const SablierContract = useContract(
    addresses[RINKEBY_ID].sablier,
    Sablier,
    true
  );
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet
  );
  const [employeeStreams, setEmployeeStreams] = useState<any>([]);
  const [totalCumulativeStream, setTotalCumulativeStream] = useState(0);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const [series, setSeries] = useState([50, 50]); //actual data points used in graph

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        try {
          let people = await parcelWalletContract.files('2');

          if (people !== '') {
            let peopleFromIpfs = await parcel.ipfs.getData(people);

            let peopleDecrypted = parcel.cryptoUtils.decryptData(
              peopleFromIpfs,
              getSignature()
            );
            peopleDecrypted = JSON.parse(peopleDecrypted);

            peopleDecrypted.forEach((person: any) => {
              //use ens / shorten address
              if (library) {
                library.lookupAddress(person.address).then((name) => {
                  if (typeof name === 'string') person.address = name;
                });
              } else person.address = shortenAddress(person.address);
            });

            console.log('peopleDecrypted:', peopleDecrypted);
            setEmployeeStreams(peopleDecrypted);
          } else console.log(`Zero Employees registered yet!`);
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract, library]);

  console.log('SablierContract:', SablierContract);

  useEffect(() => {
    (async () => {
      if (SablierContract) {
        // call getSalary for each employee
        // percentage = (NOW (unix) - start time * rate) / salary
        // if 100% turn graph color to green and stop running logic
        const streamIDs = ['171'];
        streamIDs.forEach(async (streamID: any) => {
          // console.log('stream:', streamID);
          let result = await SablierContract.getSalary(streamID);
          console.log('result:', result);

          console.log('employee:', result.employee);
          const startTime = result.startTime.toString();
          console.log('startTime:', startTime);
          const rate = result.rate.toString();
          console.log('rate:', rate);
          const salary = result.salary.toString();
          console.log('salary:', salary);
          const percentage = (Date.now() - startTime * rate) / salary;
          console.log('percentage:', percentage);
        });
      }
    })();

    return () => {};
  }, [SablierContract]);

  useEffect(() => {
    if (SablierContract) {
      const STREAMING = 50;
      const WITHDRAWN = 50;
      setSeries([STREAMING, WITHDRAWN]);
    }

    return () => {};
  }, [SablierContract]);

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
            <RadialChart series={series} />
          </Col>
          <Col
            lg="6"
            xs="12"
            className="d-flex justify-content-between flex-column text-right"
          >
            <EmployeeList employeeStreams={employeeStreams} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
