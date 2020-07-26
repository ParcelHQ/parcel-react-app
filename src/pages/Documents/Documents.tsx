import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

import { makeData } from './TableData';

import Import from '../../components/Import';

export default function Documents() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Documents" breadCrumbActive="Documents" />
      <Import />
      <Table data={makeData()} />
    </>
  );
}
