import React from 'react';
import { Row, Col } from 'reactstrap';
import SimpleTable from './SimpleTable';

import Breadcrumbs from '../BreadCrumbs';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

export default function ReactTables() {
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="React Tables"
        breadCrumbParent="Forms & Tables"
        breadCrumbActive="React Tables"
      />
      <Row>
        <Col sm="12">
          <SimpleTable />
        </Col>
      </Row>
    </>
  );
}
