import React from 'react';
import StatisticsCard from './StatisticsCard';
import CurrentStreams from './CurrentStreams';
import { Row, Col } from 'reactstrap';
import RecentActivity from './RecentActivity';
import ActivityTimeline from './ActivityTimeline';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

export default function Home() {
  return (
    <>
      <StatisticsCard />

      <CurrentStreams />
      <Row>
        <Col lg="6">
          <RecentActivity />
        </Col>
        <Col lg="6">
          <ActivityTimeline />
        </Col>
      </Row>
    </>
  );
}
