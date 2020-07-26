import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from '../../components/Tables/ReactTables';

import { makeData } from './TableData';

export default function Accounting() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Accounting" breadCrumbActive="Accounting" />
      <Table data={makeData()} title={'Transaction History'} />
    </>
  );
}
