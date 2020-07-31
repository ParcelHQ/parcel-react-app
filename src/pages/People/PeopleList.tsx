import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import parcel from 'parcel-sdk';
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

import { EmployeeContext } from '../../state/employee/Context';
import Sidebar from './Sidebar';

import '../../assets/scss/plugins/extensions/react-paginate.scss';
import '../../assets/scss/pages/data-list.scss';

import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PayrollList() {
  const { employees } = useContext(EmployeeContext);
  const [data, setData] = useState(employees);
  const [sidebar, setSidebar] = useState<any>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [addNew, setAddNew] = useState<any>(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        console.log(parcelWalletContract)
        try {
          let people = await parcelWalletContract.files('2');

          let peopleFromIpfs = await parcel.ipfs.getData(people);

          let peopleDecrypted = parcel.cryptoUtils.decryptData(
            peopleFromIpfs,
            KEY
          );

          peopleDecrypted = JSON.parse(peopleDecrypted);
          console.log(peopleDecrypted);
          setData(peopleDecrypted);
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract]);

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
      {
        name: null,
        cell: (row: any) => <ActionsComponent row={row} />,
      },
    ],
    []
  );

  async function createDepartment() {
    setLoading(true);
    if (parcelWalletContract) {
      try {
        let getDepartments = await parcelWalletContract!.files('1');
        if(getDepartments != '') {
          let departmentsFromIpfs = await parcel.ipfs.getData(getDepartments);

          let departmentsDecrypted = parcel.cryptoUtils.decryptData(
            departmentsFromIpfs,
            KEY
          );

          departmentsDecrypted = JSON.parse(departmentsDecrypted);

          departmentsDecrypted.push(department);

          let encryptedDepartmentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(departmentsDecrypted),
            KEY
          );

          let departmentHash = await parcel.ipfs.addData(encryptedDepartmentData);
          console.log(departmentHash);


          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          toast.success('Transaction Submitted');
          console.log('result:', result);
          await result.wait();
          toast.success('Transaction Confirmed');

        } else {

          let departments = [];
          departments.push(department);

          let encryptedDepartmentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(departments),
            KEY
          );

          let departmentHash = await parcel.ipfs.addData(encryptedDepartmentData);
          console.log(departmentHash);

          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          toast.success('Transaction Submitted');
          console.log('result:', result);
          await result.wait();
          toast.success('Transaction Confirmed');

        }

      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    setAddDepartmentModal(false);
    setDepartment('');
  }

  async function deleteEmployee() {
    if (parcelWalletContract) {
      let people = await parcelWalletContract.files('2');
      let peopleFromIpfs = await parcel.ipfs.getData(people);
      let peopleDecrypted = parcel.cryptoUtils.decryptData(peopleFromIpfs, KEY);
      let parsed = JSON.parse(peopleDecrypted);
      console.log('parsed:', parsed);

      console.log(selectedRow);

      const newUpdate = parsed.filter(
        (employee: any) => employee.address !== selectedRow.address
      );

      const encryptedUpdate = parcel.cryptoUtils.encryptData(
        JSON.stringify(newUpdate),
        KEY
      );
      let personHash = await parcel.ipfs.addData(encryptedUpdate);
      await parcelWalletContract.addFile('2', personHash.string);
    }

    setConfirmationModal(!confirmationModal);
  }

  return (
    <>
      <div className={'data-list list-view'}>
        <DataTable
          //@ts-ignore
          columns={columns}
          data={data}
          noHeader
          subHeader
          responsive
          pointerOnHover
          pagination
          paginationServer
          fixedHeader
          sortIcon={<ArrowDown />}
          subHeaderComponent={
            <CustomHeader handleSidebar={handleSidebar} rowsPerPage={5} />
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
          data={data}
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
              deleteEmployee();
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

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
