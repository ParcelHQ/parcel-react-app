import React, { useMemo, useState, useEffect, useContext } from 'react';
import parcel from 'parcel-sdk';
import DataTable from 'react-data-table-component';
import { Button, Col } from 'reactstrap';
import { ArrowDown } from 'react-feather';
import Checkbox from '../../components/CheckBoxes';

import { EmployeeContext } from '../../state/employee/Context';

import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import { getSignature } from '../../utility';

import styled from '@emotion/styled';

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexButton = styled(Button)`
  margin: 0 5px;
`;

export default function Table({ selectedDepartment }: any) {
  const { employees } = useContext(EmployeeContext);
  const [data, setData] = useState(employees);
  const [selectedRow, setSelectedRow] = useState<any>();

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  useEffect(() => {
    setData(employees);

    return () => {};
  }, [employees]);

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
            setData(peopleDecrypted);
          } else {
            console.log(`Zero Employees registered yet!`);
          }
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract]);

  const columns = useMemo(
    () => [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        minWidth: '150px',
        cell: (row: any) => (
          <p title={row.name} className="text-truncate text-bold-500 mb-0">
            {row.name}
          </p>
        ),
      },
      {
        name: 'Address / ENS',
        selector: 'address',
        sortable: true,
      },
      {
        name: 'Currency',
        selector: 'salaryCurrency',
        sortable: true,
      },
      {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
      },
    ],
    []
  );

  async function massPayout() {
    if (!selectedRow) {
      return;
    }
    if (parcelWalletContract) {
      //! CURRENCY TO SEND WITH
      const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
      const DAI_ADDRESS = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735';
      const USDC_ADDRESS = '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b';

      //! TOKENS_REQUESTED
      let TOKENS_REQUESTED: any[] = [];
      selectedRow.forEach((employee: any) => {
        switch (employee.salaryCurrency) {
          case 'DAI':
            TOKENS_REQUESTED.push(DAI_ADDRESS);
            break;
          case 'ETH':
            TOKENS_REQUESTED.push(ETH_ADDRESS);
            break;
          case 'USDC':
            TOKENS_REQUESTED.push(USDC_ADDRESS);
            break;

          default:
            return;
        }
      });

      //! EMPLOYEE_ADDRESSES
      let EMPLOYEE_ADDRESSES: any[] = [];
      selectedRow.forEach((employee: any) => {
        EMPLOYEE_ADDRESSES.push(employee.address);
      });

      //! VALUES_TO_SEND
      let VALUES_TO_SEND: any[] = [];
      selectedRow.forEach((employee: any) => {
        switch (employee.salaryCurrency) {
          case 'DAI':
            VALUES_TO_SEND.push('1000000000000000000');
            break;
          case 'USDC':
            VALUES_TO_SEND.push('1000000');
            break;

          default:
            return;
        }
      });

      let res = await parcelWalletContract.massPayout(
        DAI_ADDRESS,
        TOKENS_REQUESTED,
        EMPLOYEE_ADDRESSES,
        VALUES_TO_SEND
      );
      TOKENS_REQUESTED = [];
      EMPLOYEE_ADDRESSES = [];
    }
  }

  return (
    <>
      <div className={'data-list list-view'}>
        <DataTable
          //@ts-ignore
          columns={columns}
          data={data}
          noHeader
          responsive
          pointerOnHover
          fixedHeader
          sortIcon={<ArrowDown />}
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={(data) => setSelectedRow(data.selectedRows)}
          selectableRowsComponent={Checkbox}
          customStyles={{
            headRow: {
              style: {
                border: 'none',
              },
            },
            headCells: {
              style: {
                color: '#202124',
                fontSize: '14px',
              },
            },
            rows: {
              highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
              },
            },

            pagination: {
              style: {
                border: 'none',
              },
            },
          }}
        />
      </div>
      <Col sm="12">
        <FlexWrap>
          <FlexButton color="primary" disabled={true}>
            Stream
          </FlexButton>

          <FlexButton color="primary" outline onClick={() => massPayout()}>
            Pay
          </FlexButton>
        </FlexWrap>
      </Col>
    </>
  );
}
