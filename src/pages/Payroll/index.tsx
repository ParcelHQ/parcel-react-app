import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col } from 'reactstrap';
import TabsTable from './TabsTable';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';
import parcel from 'parcel-sdk';

export default function Payroll() {
  const KEY = '12345';
  const [departments, setDepartments] = useState('');

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

  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          {departments ? <TabsTable departments={departments} /> : null}
        </Col>
      </Row>
    </>
  );
}
