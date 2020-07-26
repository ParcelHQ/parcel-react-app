import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from '../../components/Tables/ReactTables';

import { makeData } from './TableData';

const Payroll = () => {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Table data={makeData()} title={'Payroll'} />
    </>
  );
};

export default Payroll;
