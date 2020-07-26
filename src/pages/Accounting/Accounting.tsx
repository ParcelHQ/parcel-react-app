import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col } from 'reactstrap';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

import { makeData } from './TableData';

export default function Accounting() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Accounting" breadCrumbActive="Accounting" />
      <Row>
        <Col sm="12">
          <Table data={makeData()} />
        </Col>
      </Row>
    </>
  );
}
