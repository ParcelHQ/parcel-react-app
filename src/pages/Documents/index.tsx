import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import Import from './Import';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import { makeData } from './TableData';

export default function Documents() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Documents" breadCrumbActive="Documents" />

      <Import />

      <Table data={makeData()} />
    </>
  );
}
