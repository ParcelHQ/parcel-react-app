import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row, Col, Spinner } from 'reactstrap';
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';
import styled from '@emotion/styled';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';

import 'flatpickr/dist/themes/light.css';
import '../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';
import { EmployeeContext } from '../../state/employee/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
`;

export default function Sidebar({
  show,
  handleSidebar,
  addNew,
  selectedRow,
  data,
}: any) {
  const { createEmployee, updateEmployee, employees } = useContext(
    EmployeeContext
  );
  const [areTherePeople, setAreTherePeople] = useState(false);
  const KEY = '12345';
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parcelWalletContract: any = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  const [newUser, setNewUser] = useState<any>({
    id: null,
    name: '',
    address: '',
    department: '',
    salary: '',
    salaryCurrency: '',
  });

  const [selectedUser, setSeletedUser] = useState<any>({
    id: null,
    name: '',
    addressOrEns: '',
    department: '',
    salary: '',
    currency: '',
  });

  useEffect(() => {
    if (selectedRow) {
      for (let i = 0; i < data.length; i++) {
        if (selectedRow.address === data[i].address) {
          setIndex(i);
          break;
        }
      }
    }
  }, [selectedRow, data]);

  useEffect(() => {
    if (index) {
      setSeletedUser(data[index]);
    }
  }, [index, data]);

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        let areTherePeople = await parcelWalletContract.files('2');
        setAreTherePeople(!!areTherePeople);
      }
    })();
  }, [parcelWalletContract]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // createEmployee({
    //   name,
    //   addressOrEns,
    //   department,
    //   currency,
    //   salary,
    //   startDate,
    //   endDate,
    // });

    try {
      setIsSubmitting(true);
      if (addNew) {
        if (!areTherePeople) {
          let PERSON: any[] = [];
          PERSON.push(newUser);

          const encryptedPersonData = parcel.cryptoUtils.encryptData(
            JSON.stringify(PERSON),
            KEY
          );
          console.log('encryptedPersonData ', encryptedPersonData);

          let personHash = await parcel.ipfs.addData(encryptedPersonData);
          console.log(personHash);

          let result = await parcelWalletContract.addFile(
            '2',
            personHash.string
          );
          await result.wait();
          toast.success('Person added successfully!');
        } else {
          let people = await parcelWalletContract.files('2');
          let peopleFromIpfs = await parcel.ipfs.getData(people);

          let peopleDecrypted = parcel.cryptoUtils.decryptData(
            peopleFromIpfs,
            KEY
          );
          peopleDecrypted = JSON.parse(peopleDecrypted);

          peopleDecrypted.push(newUser);

          const newEncryptedPersonData = parcel.cryptoUtils.encryptData(
            JSON.stringify(peopleDecrypted),
            KEY
          );

          let newPersonHash = await parcel.ipfs.addData(newEncryptedPersonData);

          let result = await parcelWalletContract.addFile(
            '2',
            newPersonHash.string
          );
          await result.wait();
          toast.success('Person added successfully!');
        }
      } else {
        // updateEmployee(selectedUser);

        let people = await parcelWalletContract.files('2');

        let peopleFromIpfs = await parcel.ipfs.getData(people);

        let peopleDecrypted = parcel.cryptoUtils.decryptData(
          peopleFromIpfs,
          KEY
        );

        let parsed = JSON.parse(peopleDecrypted);

        parsed[index] = selectedUser;

        const encryptedUpdate = parcel.cryptoUtils.encryptData(
          JSON.stringify(parsed),
          KEY
        );

        let personHash = await parcel.ipfs.addData(encryptedUpdate);

        let result = await parcelWalletContract.addFile('2', personHash.string);
        await result.wait();
        toast.success('Person Updated successfully!');
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }

    handleSidebar(false, true);
  };

  return (
    <div
      className={classnames('data-list-sidebar', {
        show: show,
      })}
    >
      <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
        <h4>{addNew ? 'ADD NEW EMPLOYEE' : 'UPDATE EMPLOYEE'}</h4>
        <X size={20} onClick={() => handleSidebar(false, true)} />
      </div>
      <PerfectScrollbar
        className="data-list-fields px-2 mt-3"
        options={{ wheelPropagation: false }}
      >
        <form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="data-name">Name</Label>
                {addNew ? (
                  <Input
                    type="text"
                    value={newUser.name}
                    placeholder="John Smith"
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    id="data-name"
                  />
                ) : (
                  <Input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSeletedUser({ ...selectedUser, name: e.target.value })
                    }
                    id="data-name"
                  />
                )}
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="address">Address / ENS</Label>
                {addNew ? (
                  <Input
                    type="text"
                    value={newUser.address}
                    id="address"
                    placeholder="0x1d9999be880e7e516dEefdA00a3919BdDE9C1707"
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: e.target.value })
                    }
                  />
                ) : (
                  <Input
                    type="text"
                    value={selectedUser.address}
                    id="address"
                    onChange={(e) =>
                      setSeletedUser({
                        ...selectedUser,
                        address: e.target.value,
                      })
                    }
                  />
                )}
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup>
                <Label for="department">Department</Label>
                {addNew ? (
                  <Input
                    type="select"
                    id="department"
                    required
                    value={newUser.department}
                    aria-label="Select a department"
                    onChange={(e) =>
                      setNewUser({ ...newUser, department: e.target.value })
                    }
                  >
                    <option disabled value="">
                      -
                    </option>
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                  </Input>
                ) : (
                  <Input
                    type="select"
                    id="department"
                    value={selectedUser.department}
                    onChange={(e) =>
                      setSeletedUser({
                        ...selectedUser,
                        department: e.target.value,
                      })
                    }
                  >
                    <option>Engineering</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>HR</option>
                  </Input>
                )}
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="salary">Salary</Label>

                {addNew ? (
                  <Input
                    type="text"
                    id="salary"
                    required
                    placeholder="100,000"
                    value={newUser.salary}
                    onChange={(e) =>
                      setNewUser({ ...newUser, salary: e.target.value })
                    }
                  />
                ) : (
                  <Input
                    type="number"
                    id="salary"
                    value={selectedUser.salary}
                    onChange={(e: any) =>
                      setSeletedUser({
                        ...selectedUser,
                        salary: parseFloat(e.target.value),
                      })
                    }
                  />
                )}
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="currency">Currency</Label>

                {addNew ? (
                  <Input
                    type="select"
                    id="currency"
                    placeholder="ETH"
                    value={newUser.salaryCurrency}
                    onChange={(e) =>
                      setNewUser({ ...newUser, salaryCurrency: e.target.value })
                    }
                  >
                    <option disabled value="">
                      -
                    </option>
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </Input>
                ) : (
                  <Input
                    type="select"
                    id="currency"
                    placeholder="ETH"
                    value={selectedUser.currency}
                    onChange={(e) =>
                      setSeletedUser({
                        ...selectedUser,
                        currency: e.target.value,
                      })
                    }
                  >
                    <option value="ETH">ETH</option>
                    <option value="DAI">DAI</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </Input>
                )}
              </FormGroup>
            </Col>
            {addNew && (
              <>
                <Col sm="12" md="6">
                  <FormGroup>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Flatpickr
                      className="form-control"
                      value={startDate}
                      options={{
                        altInput: true,
                        altFormat: 'F j, Y',
                        dateFormat: 'Y-m-d',
                      }}
                      onChange={(date: any) => setStartDate(date)}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" md="6">
                  <FormGroup>
                    <Label htmlFor="endDate">End Date</Label>

                    <Flatpickr
                      className="form-control"
                      value={endDate}
                      options={{
                        altInput: true,
                        altFormat: 'F j, Y',
                        dateFormat: 'Y-m-d',
                      }}
                      onChange={(date: any) => setEndDate(date)}
                    />
                  </FormGroup>
                </Col>
              </>
            )}
            <ButtonWrapper>
              {isSubmitting ? (
                <Spinner color="primary" />
              ) : (
                <>
                  <Button color="primary" type="submit">
                    {addNew ? 'Submit' : 'Update'}
                  </Button>

                  <Button
                    className="ml-1"
                    outline
                    color="primary"
                    onClick={() => handleSidebar(false, true)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </ButtonWrapper>
          </Row>

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
        </form>
      </PerfectScrollbar>
    </div>
  );
}
