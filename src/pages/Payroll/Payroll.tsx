import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
// import ListViewConfig from './DataListConfig';
import { Row, Col, Button } from 'reactstrap';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import MassPayout from '../../abis/MassPayouts.json';

export default function Payroll() {
  const massPayoutsContract = useContract(
    addresses[RINKEBY_ID].massPayouts,
    MassPayout,
    true
  );
  console.log('massPayoutsContract:', massPayoutsContract);

  async function massPayout() {
    const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const tokensRequested = [
      '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ];
    const employeeAddresses = [
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
    ];
    const valueToSend = ['100000000000000000', '100000000000000000'];

    const res = await massPayoutsContract!.massPayout(
      ETH_ADDRESS,
      tokensRequested,
      employeeAddresses,
      valueToSend
    );
    console.log('res:', res);
  }

  console.log('massPayoutsContract:', massPayoutsContract);
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      {/* <Table data={makeData()} title={'Payroll'} /> */}
      <Row>
        <Col sm="12">{/* <ListViewConfig /> */}</Col>
        <Col sm="12">
          <Button onClick={() => massPayout()}>Mass Payout</Button>
        </Col>
      </Row>
    </>
  );
}
