import React, { useMemo, useState, useEffect, useContext } from 'react';
import parcel from 'parcel-sdk';
import DataTable from 'react-data-table-component';
import {} from 'reactstrap';
import { ArrowDown } from 'react-feather';
import Checkbox from '../../components/CheckBoxes';

import { EmployeeContext } from '../../state/employee/Context';

import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';

export default function PayrollTable({ selectedDepartment }: any) {
  console.log('selectedDepartment:', selectedDepartment);
  const { employees } = useContext(EmployeeContext);
  const [data, setData] = useState(employees);
  const [selectedRow, setSelectedRow] = useState<any>();

  useEffect(() => {
    console.log(selectedRow);
  }, [selectedRow]);

  const KEY = '12345';

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
        console.log(parcelWalletContract);
        try {
          let people = await parcelWalletContract.files('2');
          console.log('people ', people);
          if (people !== '') {
            let peopleFromIpfs = await parcel.ipfs.getData(people);

            let peopleDecrypted = parcel.cryptoUtils.decryptData(
              peopleFromIpfs,
              KEY
            );

            peopleDecrypted = JSON.parse(peopleDecrypted);
            console.log(peopleDecrypted);
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

  return (
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
  );
}
