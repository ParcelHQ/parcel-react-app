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
import styled from '@emotion/styled';

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexButton = styled(Button)`
  margin: 0 5px;
`;

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
          console.log(departmentHash);

          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          // toast.info('Transaction Submitted');
          console.log('result:', result);
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
          console.log(departmentHash);

          let result = await parcelWalletContract!.addFile(
            '1',
            departmentHash.string
          );

          toast.info('Transaction Submitted');
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
  }

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
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          <Button
            className="add-new-btn mr-1"
            color="primary"
            onClick={() => setAddDepartmentModal(true)}
          >
            <Plus size={15} /> <span className="align-middle">Add</span>
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
