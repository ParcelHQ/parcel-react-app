import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from '../../components/Tables/ReactTables';

import { makeData } from './TableData';

import Import from '../../components/Import';

const Documents = () => {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Documents" breadCrumbActive="Documents" />
      <Import />
      <Table data={makeData()} title={'Transaction History'} />
    </>
  );
};

export default Documents;
