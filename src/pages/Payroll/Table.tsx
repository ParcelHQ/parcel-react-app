import React from 'react';
import { Card, CardBody } from 'reactstrap';
import ReactTable from 'react-table';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useContract } from '../../hooks';

export default function Table({ data }: any) {
  console.log('data:', data);

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWalletContract,
    true
  );

  async function massPayout() {
    if (parcelWalletContract) {
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

      let res = await parcelWalletContract.massPayout(
        ETH_ADDRESS,
        TOKENS_REQUESTED,
        EMPLOYEE_ADDRESSES,
        VALUES_TO_SEND
      );
      console.log('res:', res);
    }
  }

  // 0x88cc63Cd8ac62D9a2DB44eBb0888224DD81a8651

  return (
    <>
      <Card>
        <CardBody>
          {/* @ts-ignore */}
          <ReactTable
            data={data}
            columns={[
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Currency',
                accessor: 'currency',
              },
              {
                Header: 'Salary',
                accessor: 'salary',
              },
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </CardBody>
      </Card>
      <button onClick={() => massPayout()}>Mass Payout</button>
    </>
  );
}
