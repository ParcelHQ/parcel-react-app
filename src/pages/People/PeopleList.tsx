import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import parcel from 'parcel-sdk';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalHeader, ModalFooter, Input } from 'reactstrap';
import classnames from 'classnames';
import { Edit, Trash, Plus, ArrowDown, Check } from 'react-feather';
import styled from '@emotion/styled';

import { EmployeeContext } from '../../state/employee/Context';
import Sidebar from './Sidebar';
import Checkbox from '../../components/CheckBoxes';

import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';

export default function PayrollList() {
  const { employees, deleteEmployee } = useContext(EmployeeContext);
  const [data, setData] = useState(employees);
  const [sidebar, setSidebar] = useState<any>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [addNew, setAddNew] = useState<any>(false);
  const [modal, setModal] = useState(false);

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  console.log('parcelWalletContract:', parcelWalletContract);

  useEffect(() => {
    setData(employees);

    return () => {};
  }, [employees]);

  const handleSidebar = (boolean: any, addNew = false) => {
    setSidebar(boolean);
    if (addNew === true) setAddNew(true);
  };

  const CustomHeader = ({ handleSidebar, handleFilter }: any) => {
    return (
      <div className="data-list-header d-flex justify-content-between flex-wrap">
        <div className="actions-left d-flex flex-wrap">
          <Button
            className="add-new-btn"
            color="primary"
            onClick={() => handleSidebar(true, true)}
            outline
          >
            <Plus size={15} />
          </Button>
        </div>
        <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
          <div className="filter-section">
            <Input
              disabled={true}
              type="text"
              onChange={(e: any) => handleFilter(e)}
            />
          </div>
        </div>
      </div>
    );
  };

  const ActionsComponent = ({ row }: any) => {
    return (
      <div className="data-list-action">
        <Edit
          className="cursor-pointer mr-1"
          size={20}
          onClick={() => {
            setAddNew(false);
            setSelectedRow(row);
            handleSidebar(true);
          }}
        />
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setSelectedRow(row);
            setModal(!modal);
          }}
        />
      </div>
    );
  };

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
        selector: 'addressOrEns',
        sortable: true,
      },
      {
        name: 'Currency',
        selector: 'currency',
        sortable: true,
      },
      {
        name: 'Salary',
        selector: 'salary',
        sortable: true,
      },
      {
        name: null,
        cell: (row: any) => <ActionsComponent row={row} />,
      },
    ],
    []
  );

  const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
    &:hover {
      cursor: pointer;
    }
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  useEffect(() => {
    // console.log(selectedRows);
  }, [selectedRows]);

  const handleChange = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const [filteredData, setFilteredData] = useState<any>();
  const [value, setValue] = useState<any>();

  const handleFilter = (e: any) => {
    setValue(e.target.value);
    setFilteredData(e.target.value);
  };

  const [department, setDepartment] = useState('');

  async function createDepartment() {
    const DEPARTMENT = ['Engineering', 'Finance', 'Marketing', 'HR'];

    const key = '12345';

    const encryptedDepartmentData = parcel.cryptoUtils.encryptData(
      JSON.stringify(DEPARTMENT), //IF ARRAY/OBJECT, USE JSON.stringify(), ELSE USE STRING
      key
    );

    console.log('encryptedDepartmentData:', encryptedDepartmentData);

    let departmentHash = await parcel.ipfs.addData(encryptedDepartmentData);

    let result;

    if (parcelWalletContract) {
      result = await parcelWalletContract.addFile('1', departmentHash.string);
    }
    console.log('result:', result);
  }

  async function getFiles() {
    if (parcelWalletContract) {
      let files = await parcelWalletContract.files('1');
      console.log('files:', files);

      let filesFromIpfs = await parcel.ipfs.getData(files);

      let filesDecrypted = parcel.cryptoUtils.decryptData(
        filesFromIpfs,
        '12345'
      );

      filesDecrypted = JSON.parse(filesDecrypted);
      console.log('filesDecrypted:', filesDecrypted);
      console.log(typeof filesDecrypted);
    }
  }

  async function addPerson() {
    const PERSON = [
      {
        address: '0x1d9999be880e7e516dEefdA00a3919BdDE9C1707',
        name: 'Brennan Fife',
        salary: '100000',
        salaryCurrency: 'DAI',
        department: 'Engineering',
      },
      {
        address: '0x0',
        name: 'Zucks',
        salary: '1000000',
        salaryCurrency: 'USDC',
        department: 'Marketing',
      },
    ];

    const key = '12345';

    const encryptedPersonData = parcel.cryptoUtils.encryptData(
      JSON.stringify(PERSON),
      key
    );

    console.log('encryptedPersonData:', encryptedPersonData);

    let personHash = await parcel.ipfs.addData(encryptedPersonData);

    let result;

    if (parcelWalletContract) {
      result = await parcelWalletContract.addFile('2', personHash.string);
    }
    console.log('result:', result);
  }

  async function getPeople() {
    if (parcelWalletContract) {
      let people = await parcelWalletContract.files('2');
      console.log('people:', people);

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(
        peopleFromIpfs,
        '12345'
      );

      peopleDecrypted = JSON.parse(peopleDecrypted);
      console.log('peopleDecrypted:', peopleDecrypted);
      console.log(typeof peopleDecrypted);
    }
  }

  async function addAnotherPerson() {
    if (parcelWalletContract) {
      let people = await parcelWalletContract.files('2');
      console.log('people:', people);

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(
        peopleFromIpfs,
        '12345'
      );

      peopleDecrypted = JSON.parse(peopleDecrypted);

      const personObject = {
        address: '0x0',
        name: 'Bezos',
        salary: '1000000',
        salaryCurrency: 'USDC',
        department: 'Marketing',
      };

      peopleDecrypted.push(personObject);

      let key = '12345';

      const encryptedPersonData = parcel.cryptoUtils.encryptData(
        JSON.stringify(peopleDecrypted),
        key
      );

      console.log('encryptedPersonData:', encryptedPersonData);

      let personHash = await parcel.ipfs.addData(encryptedPersonData);
      console.log('personHash:', personHash);

      let newUpdatedEmployees = await parcelWalletContract.addFile(
        '2',
        personHash.string
      );
      console.log('newUpdatedEmployees:', newUpdatedEmployees);
    }
  }

  async function updatePerson() {
    if (parcelWalletContract) {
      let people = await parcelWalletContract.files('2');
      console.log('people:', people);

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(
        peopleFromIpfs,
        '12345'
      );

      console.log('peopleDecrypted:', JSON.parse(peopleDecrypted));

      let parsed = JSON.parse(peopleDecrypted);

      parsed[1].salary = '2';

      const encryptedUpdate = parcel.cryptoUtils.encryptData(
        JSON.stringify(parsed),
        '12345'
      );

      console.log('encryptedUpdate:', encryptedUpdate);

      let personHash = await parcel.ipfs.addData(encryptedUpdate);
      console.log('personHash:', personHash);

      let result = await parcelWalletContract.addFile('2', personHash.string);
      console.log('result:', result);
    }
  }

  return (
    <>
      {/* <form onSubmit={createDepartment}>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
       
      </form> */}
      <button onClick={() => createDepartment()}>create</button>
      <button onClick={() => getFiles()}>get files</button>
      <button onClick={() => addPerson()}>add person</button>
      <button onClick={() => getPeople()}>get people</button>
      <button onClick={() => addAnotherPerson()}>add another person</button>
      <button onClick={() => updatePerson()}>update person</button>
      {/* <button onClick={() => deletePerson()}>delete person</button> */}
      {/* <div className={'data-list list-view'}> */}

      {/* <DataTable
          //@ts-ignore
          columns={columns}
          // data={data}
          data={filteredData ? filteredData : data}
          noHeader
          subHeader
          responsive
          pointerOnHover
          selectableRowsHighlight
          pagination
          paginationServer
          fixedHeader
          // selectableRows
          // onSelectedRowsChange={handleChange}
          // selectableRowsComponent={Checkbox}
          // onSelectedRowsChange={(data) => setSelectedRows(data.selectedRows)}
          selectableRowsComponentProps={{
            color: 'primary',
            icon: <Check className="vx-icon" size={12} />,
            label: '',
            size: 'sm',
          }}
          sortIcon={<ArrowDown />}
          subHeaderComponent={
            <CustomHeader
              handleSidebar={handleSidebar}
              rowsPerPage={5}
              handleFilter={handleFilter}
            />
          }
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
              // selectedHighlighStyle: {
              //   backgroundColor: 'rgba(115,103,240,.05)',
              //   color: '#7367F0 !important',
              //   boxShadow: '0 0 1px 0 #7367F0 !important',
              //   '&:hover': {
              //     transform: 'translateY(0px) !important',
              //   },
              // },
            },

            pagination: {
              style: {
                border: 'none',
              },
            },
          }}
        />
        <Sidebar
          show={sidebar}
          handleSidebar={handleSidebar}
          addNew={addNew}
          selectedRow={selectedRow}
        />
        <div
          className={classnames('data-list-overlay', {
            show: sidebar,
          })}
          onClick={() => handleSidebar(false, true)}
        />
      </div>

      <Modal isOpen={modal} toggle={() => setModal(!modal)} centered> */}
      {/* <ModalHeader toggle={() => setModal(!modal)}>
          Confirm Delete?
        </ModalHeader>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              deleteEmployee(selectedRow.id);
              setModal(!modal);
            }}
          >
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  );
}
