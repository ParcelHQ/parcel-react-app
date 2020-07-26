import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

import { makeData } from './TableData';

export default function People() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="People" breadCrumbActive="People" />
      <Table data={makeData()} />
    </>
  );
}
