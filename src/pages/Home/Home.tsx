import React from 'react';
import ReactTables from '../../components/Tables/ReactTables';
import StatisticsCard from './StatisticsCard';
import BrowserStats from './BrowserStats';
import { Row, Col } from 'reactstrap';
import Tasks from './Tasks';

export default function Home() {
  return (
    <>
      <StatisticsCard />
      <Row>
        <Col lg="8" md="12">
          <BrowserStats />
        </Col>
        <Col lg="4" md="12">
          <Tasks />
        </Col>
      </Row>
      <ReactTables />
    </>
  );
}
