import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col, CustomInput } from 'reactstrap';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';
import PayrollTable from './PayrollTable';
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
import { Plus } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payroll() {
  const KEY = '12345';
  const [options, setOptions] = useState<any>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        try {
          let files = await parcelWalletContract.files('1');

          let filesFromIpfs = await parcel.ipfs.getData(files);

          let filesDecrypted = parcel.cryptoUtils.decryptData(
            filesFromIpfs,
            KEY
          );

          if (filesDecrypted) {
            filesDecrypted = JSON.parse(filesDecrypted);

            let newOutcomes = [];
            for (let i = 0; i < filesDecrypted.length; i++) {
              newOutcomes.push(filesDecrypted[i]);
            }
            setOptions(newOutcomes);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [parcelWalletContract]);

  async function createDepartment() {
    setLoading(true);
    if (parcelWalletContract) {
      try {
        let getDepartments = await parcelWalletContract!.files('1');
        if (getDepartments !== '') {
          let departmentsFromIpfs = await parcel.ipfs.getData(getDepartments);

          let departmentsDecrypted = parcel.cryptoUtils.decryptData(
            departmentsFromIpfs,
            KEY
          );

          departmentsDecrypted = JSON.parse(departmentsDecrypted);

          departmentsDecrypted.push(newDepartment);

          let encryptedDepartmentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(departmentsDecrypted),
            KEY
          );

          let departmentHash = await parcel.ipfs.addData(
            encryptedDepartmentData
          );

          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          // toast.info('Transaction Submitted');
          await result.wait();
          toast.success('Transaction Confirmed');
        } else {
          let departments = [];
          departments.push(newDepartment);

          let encryptedDepartmentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(departments),
            KEY
          );

          let departmentHash = await parcel.ipfs.addData(
            encryptedDepartmentData
          );

          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          toast.info('Transaction Submitted');
          await result.wait();
          toast.success('Transaction Confirmed');
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    setAddDepartmentModal(false);
  }

  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          <Button
            className="add-new-btn mr-1"
            color="primary"
            onClick={() => setAddDepartmentModal(true)}
          >
            <Plus size={15} />{' '}
            <span className="align-middle">Add Department</span>
          </Button>
          <CustomInput
            type="select"
            name="select"
            id="selectDepartment"
            value={selectedDepartment}
            aria-label="Select a department"
            onChange={(e: any) => setSelectedDepartment(e.target.value)}
            style={{ width: '200px' }}
          >
            {options.map((option: any) => (
              <option key={option} value={option} aria-label={option}>
                {option}
              </option>
            ))}
          </CustomInput>
        </Col>

        <Col sm="12">
          {options ? (
            <PayrollTable selectedDepartment={selectedDepartment} />
          ) : (
            <h1>No departments</h1>
          )}
        </Col>
      </Row>
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
                value={newDepartment}
                onChange={(e: any) => setNewDepartment(e.target.value)}
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
