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
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Input,
  FormGroup,
  ModalBody,
  Label,
  Spinner,
} from 'reactstrap';
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
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<any>();
  const [value, setValue] = useState<any>();

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
            style={{ marginRight: '1rem' }}
          >
            <Plus size={15} /> Add Employee
          </Button>
          <Button
            className="add-new-btn"
            color="primary"
            onClick={() => setAddDepartmentModal(true)}
          >
            <Plus size={15} /> Add Department
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
            setConfirmationModal(!confirmationModal);
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

  const handleFilter = (e: any) => {
    setValue(e.target.value);
    setFilteredData(e.target.value);
  };

  async function createDepartment() {
    setLoading(true);
    try {
      let encryptedDepartmentData;
      //TODO: ADD ARRAY, STILL USING JSON.stringify()
      if (department === 'object')
        encryptedDepartmentData = parcel.cryptoUtils.encryptData(
          JSON.stringify(department),
          KEY
        );
      else
        encryptedDepartmentData = parcel.cryptoUtils.encryptData(
          department,
          KEY
        );

      let departmentHash = await parcel.ipfs.addData(encryptedDepartmentData);

      if (parcelWalletContract) {
        let result = await parcelWalletContract.addFile(
          '1',
          departmentHash.string
        );
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setAddDepartmentModal(false);
  }

  async function getFiles() {
    if (parcelWalletContract) {
      let files = await parcelWalletContract.files('1');

      let filesFromIpfs = await parcel.ipfs.getData(files);

      let filesDecrypted = parcel.cryptoUtils.decryptData(filesFromIpfs, KEY);

      if (typeof filesDecrypted !== 'string')
        filesDecrypted = JSON.parse(filesDecrypted);
    }
  }

  async function getPeople() {
    if (parcelWalletContract) {
      let people = await parcelWalletContract.files('2');

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(peopleFromIpfs, KEY);

      peopleDecrypted = JSON.parse(peopleDecrypted);
    }
  }

  return (
    <>
      <div className={'data-list list-view'}>
        <button onClick={() => getFiles()}>get departments</button>
        <button onClick={() => getPeople()}>get people</button>
        <DataTable
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

      <Modal
        isOpen={confirmationModal}
        toggle={() => setConfirmationModal(!confirmationModal)}
        centered
      >
        <ModalHeader toggle={() => setConfirmationModal(!confirmationModal)}>
          Confirm Delete?
        </ModalHeader>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              deleteEmployee(selectedRow.id);
              setConfirmationModal(!confirmationModal);
            }}
          >
            Delete
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => setConfirmationModal(!confirmationModal)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={addDepartmentModal}
        toggle={() => setAddDepartmentModal(!addDepartmentModal)}
        centered
      >
        <ModalHeader toggle={() => setAddDepartmentModal(!addDepartmentModal)}>
          Add Department
        </ModalHeader>

        <ModalBody>
          {loading ? (
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Spinner size="lg" color="primary" />
            </div>
          ) : (
            <FormGroup>
              <Label for="department">Department</Label>
              <Input
                type="text"
                id="department"
                required
                placeholder="i.e. Marketing"
                value={department}
                onChange={(e: any) => setDepartment(e.target.value)}
              />
            </FormGroup>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            onClick={() => createDepartment()}
          >
            Add
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => setAddDepartmentModal(!addDepartmentModal)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
