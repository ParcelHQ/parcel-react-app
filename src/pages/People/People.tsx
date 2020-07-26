import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from '../../components/Tables/ReactTables';

import { makeData } from './TableData';

const People = () => {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="People" breadCrumbActive="People" />
      <Table data={makeData()} title={'People'} />
    </>
  );
};

export default People;
