import React, { useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { keccak256 } from '@ethersproject/keccak256';
import { toUtf8Bytes } from '@ethersproject/strings';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelFactoryContract from '../../abis/ParcelFactory.json';
import { shortenAddress } from '../../utility';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import namehash from 'eth-ens-namehash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Button,
  FormGroup,
  Label,
  Spinner,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function Create() {
  const { library } = useWeb3React<Web3Provider>();
  const parcelFactoryContract = useContract(
    addresses[RINKEBY_ID].parcelFactory,
    ParcelFactoryContract.abi,
    true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PARCEL_ID_HASH = namehash.hash('parcelid.eth');
  const [open, setOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(value: any) {
    const name = value.ensName;
    setIsSubmitting(true);

    const nameHash = keccak256(toUtf8Bytes(name));
    const ensFullDomainHash = namehash.hash(name + '.parcelid.eth');

    if (!!library) {
      const doesItExist = await library.resolveName(name + '.parcelid.eth');
      if (doesItExist) setOpen(true);
      else if (!!parcelFactoryContract)
        try {
          const tx = await parcelFactoryContract.register(
            PARCEL_ID_HASH,
            nameHash,
            ensFullDomainHash
          );
          toast.info('Transaction Submitted');
          const result = await tx.wait();
          toast.success(`Transaction ${result.blockHash} Confirmed`);
          setSubmitted(true);
        } catch (error) {
          toast.error('Transaction Failed');
        }
    }
    setIsSubmitting(false);
  }

  return (
    <>
      {submitted && <Redirect to="/" />}
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <h1 className="font-large-3 my-1">Register a Name</h1>
              <Formik
                initialValues={{
                  ensName: '',
                }}
                validationSchema={Yup.object().shape({
                  ensName: Yup.string()
                    .required('Name is required')
                    .min(6, 'Name must be at least 6 characters')
                    .max(20, 'Name must be less than 20 characters'),
                })}
                onSubmit={(fields) => handleSubmit(fields)}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormGroup className="my-3">
                      <Label aria-labelledby="ensName" />
                      <InputGroup>
                        <Field
                          id="ensName"
                          name="ensName"
                          type="text"
                          placeholder="ethglobal"
                          className={
                            'form-control' +
                            (errors.ensName && touched.ensName && ' is-invalid')
                          }
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>parcelid.eth</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <ErrorMessage
                        name="ensName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>

                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner color="light" /> : 'Submit'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* <button onClick={() => notify()}>Notify !</button> */}

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
