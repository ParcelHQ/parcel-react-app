import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import ReactTable from 'react-table';
import styled from '@emotion/styled';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useContract } from '../../hooks';

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexButton = styled(Button)`
  margin: 0 5px;
`;

export default function Table({ data }: any) {
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
      <FlexWrap>
        <FlexButton color="primary" disabled={true}>
          Stream
        </FlexButton>

        <FlexButton color="primary" outline onClick={() => massPayout()}>
          Pay
        </FlexButton>
      </FlexWrap>
    </>
  );
}
