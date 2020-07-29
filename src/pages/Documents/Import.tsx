import React, { useCallback, useState } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useContract } from '../../hooks';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'reactstrap';
import parcel from 'parcel-sdk';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { Spinner } from 'reactstrap';

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Import = () => {
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWalletContract,
    true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buffer, setBuffer] = useState('');

  const { account, library } = useWeb3React<Web3Provider>();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      library!
        .getSigner(account!)
        .signMessage(buffer)
        .then((signature: any) => {
          return parcel.cryptoUtils.encryptData(buffer, signature);
        })
        .then((encryptedData) => {
          return parcel.ipfs.addData(encryptedData);
        })
        .then((res) => {
          parcelWalletContract!.addFile(1, res.string);
        });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    //@ts-ignore
    reader.onloadend = () => setBuffer(Buffer(reader.result));
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <Row className="import-component">
      <Col sm="12">
        <Card>
          <CardBody>
            <Row>
              <Col sm="12">
                <form
                  onSubmit={onSubmit}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Container {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag n drop some files here, or click to select files</p>
                  </Container>
                  <aside>
                    <ul>
                      {acceptedFiles.map((file: any) => (
                        <li key={file.path}>
                          {file.path} - {file.size} bytes
                        </li>
                      ))}
                    </ul>
                  </aside>
                  <Button type="submit" color="primary">
                    {isSubmitting ? <Spinner color="light" /> : 'Submit'}
                  </Button>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Import;
