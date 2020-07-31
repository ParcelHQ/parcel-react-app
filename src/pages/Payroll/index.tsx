import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col } from 'reactstrap';
import TabsTable from './TabsTable';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
  const [departments, setDepartments] = useState('');
  const [department, setDepartment] = useState('');
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
          console.log('files:', files);

          let filesFromIpfs = await parcel.ipfs.getData(files);
          console.log('filesFromIpfs:', filesFromIpfs);

          let filesDecrypted = parcel.cryptoUtils.decryptData(
            filesFromIpfs,
            KEY
          );

          if (filesDecrypted) {
            filesDecrypted = JSON.parse(filesDecrypted);
            console.log('filesDecrypted:', filesDecrypted);
            setDepartments(filesDecrypted);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
    return () => {};
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

          departmentsDecrypted.push(department);

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

          toast.info('Transaction Submitted');
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

          let departmentHash = await parcel.ipfs.addData(
            encryptedDepartmentData
          );
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

  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>
                <Button
                  className="add-new-btn"
                  color="primary"
                  onClick={() => setAddDepartmentModal(true)}
                >
                  <Plus size={15} /> Add Department
                </Button>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {departments ? (
                <TabsTable departments={departments} />
              ) : (
                <h1>No departments</h1>
              )}
            </CardBody>
          </Card>
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
