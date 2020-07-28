import React, { useCallback, useState } from 'react';
import Table from './Table';
import Breadcrumbs from '../../components/BreadCrumbs';
import Import from '../../components/Import';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useContract } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'reactstrap';
import parcel from 'parcel-sdk';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { Spinner } from 'reactstrap';

import { makeData } from './TableData';

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

export default function Documents() {
  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWalletContract,
    true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storageValue, setStorageValue] = useState('');
  const [buffer, setBuffer] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // setIsSubmitting(true);
    //! replace hello with signature key from ethers
    const encryptedData = parcel.cryptoUtils.encryptData(buffer, 'hello');
    const res = await parcel.ipfs.addData(encryptedData);
    console.log('res:', res.string);
    // const HEX_VALUE = utils.formatBytes32String(res.string);
    // console.log('HEX_VALUE:', HEX_VALUE);
    // setStorageValue(res.path);
    const result = await parcelWalletContract!.addFile(1, res.string);
    console.log('result:', result);
    // setIsSubmitting(false);
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

      <form onSubmit={onSubmit}>
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
        <Button type="submit">
          {isSubmitting ? <Spinner color="light" /> : 'Submit'}
        </Button>
      </form>

      <Table data={makeData()} />
    </>
  );
}
