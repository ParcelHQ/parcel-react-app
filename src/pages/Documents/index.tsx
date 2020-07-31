import React, { useState, useEffect, useCallback } from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useContract } from '../../hooks';
import parcel from 'parcel-sdk';
import {
  Card,
  Spinner,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';
import ReactTable from 'react-table';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default function Documents() {
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWalletContract,
    true
  );

  const [documentsData, setDocumentsData] = useState([
    {
      name: 'Tarun',
      owner: 'hi',
      size: 2885,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buffer, setBuffer] = useState('');
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    (async () => {
      if (parcelWalletContract) {
        console.log('parcelWalletContract:', parcelWalletContract);
        try {
          let documentsFromContractHash = await parcelWalletContract!.files(
            '3'
          );

          console.log('documentsFromContractHash ', documentsFromContractHash);

          let documentsFromIpfs = await parcel.ipfs.getData(
            documentsFromContractHash
          );

          console.log('documentsFromIpfs ', documentsFromIpfs);

          let decryptedData = parcel.cryptoUtils.decryptData(
            documentsFromIpfs,
            'signature'
          );

          console.log('decryptedData:', decryptedData);

          // console.log('JSON.parse(decryptedData):', JSON.parse(decryptedData));
          setDocumentsData(JSON.parse(decryptedData));
        } catch (error) {}
      }
    })();
  }, [parcelWalletContract]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (library && account) {
      try {
        let documentsFromContractHash = await parcelWalletContract!.files('3');

        if (documentsFromContractHash !== '') {
          let getEncryptedDocumentsData = await parcel.ipfs.getData(
            documentsFromContractHash
          );

          let decryptedDocumentsData = parcel.cryptoUtils.decryptData(
            getEncryptedDocumentsData,
            'signature'
          );

          decryptedDocumentsData = JSON.parse(decryptedDocumentsData);

          let file = acceptedFiles[0];

          decryptedDocumentsData.push({
            name,
            size: file.size,
            content: buffer,
            owner: account,
          });

          let encryptedDocumentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(decryptedDocumentsData),
            'signature'
          );

          let encryptedDocumentDataHash = await parcel.ipfs.addData(
            encryptedDocumentData
          );

          await parcel.ipfs.getData(encryptedDocumentDataHash.string);

          let result = await parcelWalletContract!.addFile(
            '3',
            encryptedDocumentDataHash.string
          );

          await result.wait();
        } else {
          let documentsData = [];
          let file = acceptedFiles[0];
          documentsData.push({
            name,
            size: file.size,
            content: buffer,
            owner: account,
          });

          let encryptedDocumentData = parcel.cryptoUtils.encryptData(
            JSON.stringify(documentsData),
            'signature'
          );

          let encryptedDocumentDataHash = await parcel.ipfs.addData(
            encryptedDocumentData
          );

          await parcel.ipfs.getData(encryptedDocumentDataHash.string);

          let result = await parcelWalletContract!.addFile(
            '3',
            encryptedDocumentDataHash.string
          );

          await result.wait();
        }
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
      }
    }

    setIsSubmitting(false);
    setModal(false);
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
    <>
      <Breadcrumbs breadCrumbTitle="Documents" breadCrumbActive="Documents" />

      <Card>
        <CardHeader>
          <CardTitle>
            <Button
              className="add-new-btn"
              color="primary"
              onClick={() => setModal(!modal)}
            >
              Add Document
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody>
          {/* @ts-ignore */}
          <ReactTable
            data={documentsData}
            columns={[
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Owner',
                accessor: 'owner',
              },
              {
                Header: 'File Size',
                accessor: 'size',
              },
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </CardBody>
      </Card>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setModal(!modal)}>Submit File</ModalHeader>
        <ModalBody
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isSubmitting ? (
            <Spinner color="primary" size="lg" />
          ) : (
            <form
              onSubmit={onSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="My File"
                  required
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </FormGroup>
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
                Submit
              </Button>
            </form>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
