import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col, CustomInput } from 'reactstrap';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';
import PayrollTable from './PayrollTable';
import { v4 as uuidv4 } from 'uuid';
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
import { Plus, X } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSignature } from '../../utility';
import styled from '@emotion/styled';

const DepartmentOptions = styled(FormGroup)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default function Payroll() {
  // const [options, setOptions] = useState<any>([]);
  const [options, setOptions] = useState<any>(['']);
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
            getSignature()
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
            getSignature()
          );

          departmentsDecrypted = JSON.parse(departmentsDecrypted);

          departmentsDecrypted.push(newDepartment);

          let encryptedDepartmentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(departmentsDecrypted),
            getSignature()
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
            getSignature()
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

  const removeOption = (index: any) => () =>
    setOptions(options.filter((s: any, sidx: any) => index !== sidx));

  const handleOptionChange = (idx: any) => (evt: any) => {
    const newOptions = options.map((option: any, sidx: any) => {
      if (idx !== sidx) return option;
      return evt.target.value;
    });

    setOptions(newOptions);
  };

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
              <option key={uuidv4()} value={option} aria-label={option}>
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
            <>
              {options.map((option: any, i: any) => (
                <DepartmentOptions key={uuidv4()}>
                  <Label for="department">Department</Label>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Input
                      type="text"
                      id="department"
                      name="department"
                      value={option}
                      onChange={handleOptionChange(i)}
                      required
                      placeholder={'i.e. Marketing'}
                    />
                    <Button
                      type="button"
                      onClick={removeOption(i)}
                      disabled={options.length === 1}
                      style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                    >
                      <X size={15} />
                    </Button>

                    {options.length < 4 && options.length - 1 === i && (
                      <Button
                        type="button"
                        onClick={() => setOptions(options.concat(['']))}
                        style={{ padding: '0.5rem', marginLeft: '0.5rem' }}
                      >
                        <Plus size={15} />
                      </Button>
                    )}
                  </div>
                </DepartmentOptions>
              ))}
            </>
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
