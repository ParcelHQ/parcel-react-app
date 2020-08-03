import React, { useState, useEffect } from 'react';
import { Label, Input, FormGroup, Button } from 'reactstrap';
import { X } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row, Col, Spinner } from 'reactstrap';
import classnames from 'classnames';
import styled from '@emotion/styled';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';
import { getSignature } from '../../utility';

import 'flatpickr/dist/themes/light.css';
import '../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
`;

export default function Sidebar({
  show,
  handleSidebar,
  selectedRow,
  data,
}: any) {
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parcelWalletContract: any = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let people = await parcelWalletContract.files('2');

      let peopleFromIpfs = await parcel.ipfs.getData(people);

      let peopleDecrypted = parcel.cryptoUtils.decryptData(
        peopleFromIpfs,
        getSignature()
      );

      let parsed = JSON.parse(peopleDecrypted);

      parsed[index] = selectedUser;

      const encryptedUpdate = parcel.cryptoUtils.encryptData(
        JSON.stringify(parsed),
        getSignature()
      );

      let personHash = await parcel.ipfs.addData(encryptedUpdate);

      let result = await parcelWalletContract.addFile('2', personHash.string);
      await result.wait();

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
        show: true,
      })}
    >
      <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
        <h4>UPDATE EMPLOYEE</h4>
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

                <Input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSeletedUser({ ...selectedUser, name: e.target.value })
                  }
                  id="data-name"
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="address">Address / ENS</Label>

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
              </FormGroup>
            </Col>

            <Col sm="12">
              <FormGroup>
                <Label for="department">Department</Label>

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
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="salary">Salary</Label>

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
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="currency">Currency</Label>

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
              </FormGroup>
            </Col>

            <ButtonWrapper>
              {isSubmitting ? (
                <Spinner color="primary" />
              ) : (
                <>
                  <Button color="primary" type="submit">
                    Update
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
        </form>
      </PerfectScrollbar>
    </div>
  );
}
