import React, { useState , useEffect} from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Import from './Import';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import { documentsDummyData } from './TableData';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import ParcelWalletContract from '../../abis/ParcelWallet.json';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useContract } from '../../hooks';
import parcel from 'parcel-sdk';



export default function Documents() {
  const [ documentsData, setDocumentsData ] = useState(documentsDummyData);


  // useEffect(() => {
  //   (async ()=> {
  //     const parcelWalletContract = useContract(
  //       addresses[RINKEBY_ID].parcelWallet,
  //       ParcelWalletContract,
  //       true
  //     );
  //     console.log(parcelWalletContract)
  //     let documentsFromContractHash = await parcelWalletContract!.files('3');
  //     let documentsFromIpfs = await parcel.ipfs.getData(documentsFromContractHash);
  //
  //     let decryptedData = parcel.cryptoUtils.decryptedData(documentsFromIpfs,"signature");
  //     console.log(decryptedData)
  //     console.log(JSON.parse(decryptedData))
  //   })();
  // }, []);

  return (
    <>
      <Breadcrumbs breadCrumbTitle="Documents" breadCrumbActive="Documents" />

      <Import />
      <Table data={documentsData} />
    </>
  );
}
