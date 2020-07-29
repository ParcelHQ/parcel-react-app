import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col, Button } from 'reactstrap';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import MassPayout from '../../abis/MassPayouts.json';
import ParcelWallet from '../../abis/ParcelWallet.json';
import TabsTable from './TabsTable';

export default function Payroll() {
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  const massPayoutsContract = useContract(
    addresses[RINKEBY_ID].massPayouts,
    MassPayout,
    true
  );

  async function massPayout() {
    const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const TOKENS_REQUESTED = [
      '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ];
    const EMPLOYEE_ADDRESSES = [
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
    ];
    const VALUES_TO_SEND = ['100000000000000000', '100000000000000000'];

    // const toEncrypt = await massPayoutsContract!.massPayout(
    //   ETH_ADDRESS,
    //   TOKENS_REQUESTED,
    //   EMPLOYEE_ADDRESSES,
    //   VALUES_TO_SEND
    // );

    const MASSPAYOUT_ADDRESS = addresses[RINKEBY_ID].massPayouts;

    const DATA =
      '0x89f970ef000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000200000000000000000000000036ec99a4ca6f1a3e3299aeb94587f34a9e6ada1f00000000000000000000000036ec99a4ca6f1a3e3299aeb94587f34a9e6ada1f0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000016345785d8a0000';

    const result = await parcelWalletContract!.execute(
      [MASSPAYOUT_ADDRESS],
      [DATA]
    );
    console.log('result:', result);
  }

  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          <TabsTable />
        </Col>

        <Col sm="12">
          <Button>Stream</Button>

          <Button onClick={() => massPayout()}>Pay</Button>
        </Col>
      </Row>
    </>
  );
}
