import React, { useState, useContext } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelFactoryContract from '../../abis/ParcelFactory.json';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import namehash from 'eth-ens-namehash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrganizationContext } from '../../state/organization/Context';

import {
  Button,
  FormGroup,
  Label,
  Spinner,
  InputGroupAddon,
  InputGroup,
  Input,
  InputGroupText,
  FormFeedback,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function Create() {
  const { organization, createParcelWallet } = useContext(OrganizationContext);

  const { library, account } = useWeb3React<Web3Provider>();
  const [ensName, setEnsName] = useState('');
  const parcelFactoryContract = useContract(
    addresses[RINKEBY_ID].parcelFactory,
    ParcelFactoryContract,
    true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PARCEL_ID_HASH = namehash.hash('parcelid.eth');
  const [open, setOpen] = useState(false);
  const [invalidState, setInvalidState] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);

    if (ensName.length < 5) {
      setInvalidState(true);
      setError('Name must be at least 5 characters');
      setIsSubmitting(false);
      return;
    } else if (ensName.length > 20) {
      setInvalidState(true);
      setError('Name must be less than 20 characters');
      setIsSubmitting(false);
      return;
    }

    const nameHash = keccak256(toUtf8Bytes(ensName));
    const ensFullDomainHash = namehash.hash(ensName + '.parcelid.eth');

    if (!!library) {
      const doesItExist = await library.resolveName(ensName + '.parcelid.eth');
      if (doesItExist) setOpen(true);
      else if (!!parcelFactoryContract)
        try {
          const tx = await parcelFactoryContract.register(
            PARCEL_ID_HASH,
            nameHash,
            ensFullDomainHash
          );

          toast.info('Transaction Submitted');
          await tx.wait();

          let parcelOrgAddress = await parcelFactoryContract.registered(
            account
          );

          createParcelWallet(parcelOrgAddress);

          // setSubmitted(true);
        } catch (error) {
          toast.error('Transaction Failed');

          setIsSubmitting(false);
        }
    }
  }

  return (
    <>
      {submitted && <Redirect to="/home" />}
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <h1 className="font-large-3 my-1">Register a Name</h1>
              <h1 className="font-large-1 my-1">Create a Parcel ID</h1>
              <form onSubmit={handleSubmit}>
                <FormGroup
                  className="my-1"
                  style={{ width: '50%', margin: 'auto' }}
                >
                  <Label aria-labelledby="ensName" />
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="ETHGlobal"
                      id="validState"
                      name="validState"
                      value={ensName}
                      onChange={(e: any) => setEnsName(e.target.value)}
                      invalid={invalidState}
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>@parcelid.eth</InputGroupText>
                    </InputGroupAddon>
                    <FormFeedback
                      style={{ position: 'absolute', marginTop: '3rem' }}
                    >
                      {error}
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>

                <Button
                  className="my-1"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px 16px',
                  }}
                >
                  {isSubmitting ? (
                    <Spinner color="light" size="sm" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
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

      <SweetAlert
        title="Name already taken"
        show={open}
        onConfirm={() => setOpen(false)}
      >
        <p className="sweet-alert-text">
          Please enter in a new name and try again
        </p>
      </SweetAlert>
    </>
  );
}
