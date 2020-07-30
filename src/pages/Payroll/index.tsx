import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Row, Col } from 'reactstrap';
import TabsTable from './TabsTable';

export default function Payroll() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      <Row>
        <Col sm="12">
          <TabsTable />
        </Col>
      </Row>
    </>
  );
}
