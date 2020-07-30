import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row, Col } from 'reactstrap';
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

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
`;

interface ISelectedUser {
  id: any;
  name: string;
  addressOrEns: string;
  department: string;
  salary: any;
  currency: string;
}

export default function Sidebar({
  show,
  handleSidebar,
  addNew,
  selectedRow,
}: any) {
  const { createEmployee, updateEmployee, employees } = useContext(
    EmployeeContext
  );
  const KEY = '12345';
  const [name, setName] = useState<any>('');
  const [addressOrEns, setAddressOrEns] = useState<any>('');
  const [department, setDepartment] = useState<any>('Engineering');
  const [currency, setCurrency] = useState<any>('');
  const [salary, setSalary] = useState<any>('');
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const parcelWalletContract: any = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  const [selectedUser, setSeletedUser] = useState<ISelectedUser>({
    id: null,
    name: '',
    addressOrEns: '',
    department: '',
    salary: '',
    currency: '',
  });

  useEffect(() => {
    if (selectedRow) {
      const employeeId = selectedRow.id;
      const selectedUser = employees.find(
        (emp: any) => emp.id === parseInt(employeeId)
      );
      setSeletedUser(selectedUser);
    }
  }, [selectedRow]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (addNew) {
      // createEmployee({
      //   name,
      //   addressOrEns,
      //   department,
      //   currency,
      //   salary,
      //   startDate,
      //   endDate,
      // });

      //!if no people
      //   name,
      //   addressOrEns,
      //   department,
      //   currency,
      //   salary,
      //   startDate,
      //   endDate,
      const PERSON = [
        {
          address: '0x1d9999be880e7e516dEefdA00a3919BdDE9C1707',
          name: 'Brennan Fife',
          salary: '100000',
          salaryCurrency: 'DAI',
          department: 'Engineering',
        },
      ];

      const encryptedPersonData = parcel.cryptoUtils.encryptData(
        JSON.stringify(PERSON),
        KEY
      );

      let personHash = await parcel.ipfs.addData(encryptedPersonData);

      let result = await parcelWalletContract.addFile('2', personHash.string);

      //! if there are already people
      // let people = await parcelWalletContract.files('2');
      // let peopleFromIpfs = await parcel.ipfs.getData(people);

      // let peopleDecrypted = parcel.cryptoUtils.decryptData(peopleFromIpfs, KEY);

      // peopleDecrypted = JSON.parse(peopleDecrypted);

      // const personObject = {
      //   address: '0x0',
      //   name: 'Bezos',
      //   salary: '1000000',
      //   salaryCurrency: 'USDC',
      //   department: 'Marketing',
      // };

      // peopleDecrypted.push(personObject);

      // const newEncryptedPersonData = parcel.cryptoUtils.encryptData(
      //   JSON.stringify(peopleDecrypted),
      //   KEY
      // );

      // let newPersonHash = await parcel.ipfs.addData(newEncryptedPersonData);

      // let newUpdatedEmployees = await parcelWalletContract.addFile(
      //   '2',
      //   newPersonHash.string
      // );
    } else {
      // updateEmployee(selectedUser);

      let people = await parcelWalletContract.files('2');

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(peopleFromIpfs, KEY);

      console.log('peopleDecrypted:', JSON.parse(peopleDecrypted));

      let parsed = JSON.parse(peopleDecrypted);

      parsed[1].salary = '2';

      const encryptedUpdate = parcel.cryptoUtils.encryptData(
        JSON.stringify(parsed),
        KEY
      );

      let personHash = await parcel.ipfs.addData(encryptedUpdate);

      let result = await parcelWalletContract.addFile('2', personHash.string);
    }

    // handleSidebar(false, true);
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
                    value={name}
                    placeholder="John Smith"
                    onChange={(e) => setName(e.target.value)}
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
                <Label htmlFor="addressOrEns">Address / ENS</Label>
                {addNew ? (
                  <Input
                    type="text"
                    value={addressOrEns}
                    id="addressOrEns"
                    placeholder="0x1d9999be880e7e516dEefdA00a3919BdDE9C1707"
                    onChange={(e) => setAddressOrEns(e.target.value)}
                  />
                ) : (
                  <Input
                    type="text"
                    value={selectedUser.addressOrEns}
                    id="addressOrEns"
                    onChange={(e) =>
                      setSeletedUser({
                        ...selectedUser,
                        addressOrEns: e.target.value,
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
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option>Engineering</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>HR</option>
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
                <Label htmlFor="currency">Currency</Label>

                {addNew ? (
                  <Input
                    type="select"
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option>ETH</option>
                    <option>DAI</option>
                    <option>USDC</option>
                    <option>USDT</option>
                  </Input>
                ) : (
                  <Input
                    type="select"
                    id="currency"
                    value={selectedUser.currency}
                    onChange={(e) =>
                      setSeletedUser({
                        ...selectedUser,
                        currency: e.target.value,
                      })
                    }
                  >
                    <option>ETH</option>
                    <option>DAI</option>
                    <option>USDC</option>
                    <option>USDT</option>
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
                    value={salary}
                    onChange={(e: any) => setSalary(e.target.value)}
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
              <Button color="primary" type="submit">
                {addNew ? 'Submit' : 'Update'}
              </Button>
              <Button
                className="ml-1"
                color="danger"
                onClick={() => handleSidebar(false, true)}
              >
                Cancel
              </Button>
            </ButtonWrapper>
          </Row>
        </form>
      </PerfectScrollbar>
    </div>
  );
}
