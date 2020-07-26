import React from 'react';
import Breadcrumbs from '../../components/BreadCrumbs';
// import ListViewConfig from './DataListConfig';
import { Row, Col } from 'reactstrap';

export default function Payroll() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="Payroll" breadCrumbActive="Payroll" />
      {/* <Table data={makeData()} title={'Payroll'} /> */}
      <Row>
        <Col sm="12">{/* <ListViewConfig /> */}</Col>
      </Row>
    </>
  );
}
