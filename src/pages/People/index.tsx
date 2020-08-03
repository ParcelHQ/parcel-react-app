import React from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/BreadCrumbs';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import PeopleList from './PeopleList';

export default function People() {
  return (
    <>
      <Breadcrumbs breadCrumbTitle="People" breadCrumbActive="People" />
      <Row>
        <Col sm="12">
          <PeopleList />
        </Col>
      </Row>
    </>
  );
}
