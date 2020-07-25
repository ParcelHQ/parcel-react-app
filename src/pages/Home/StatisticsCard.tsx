import React from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/BreadCrumbs';
import StatisticsCard from '../../components/StatisticsCard';
import { Monitor, UserCheck, Mail } from 'react-feather';
import {
  siteTraffic,
  siteTrafficSeries,
  activeUsers,
  activeUsersSeries,
  newsLetter,
  newsLetterSeries,
} from '../../data/StatisticsData2';

export default function StatisticsCards() {
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Statistics Cards"
        breadCrumbParent="Card"
        breadCrumbActive="Statistics Cards"
      />
      <Row>
        <Col lg="4" md="6" sm="12">
          <StatisticsCard
            iconRight
            icon={<Monitor className="primary" size={22} />}
            stat="78.9k"
            statTitle="Site Traffic"
            options={siteTraffic}
            series={siteTrafficSeries}
            type="line"
          />
        </Col>
        <Col lg="4" md="6" sm="12">
          <StatisticsCard
            iconRight
            icon={<UserCheck className="success" size={22} />}
            iconBg="success"
            stat="659.8k"
            statTitle="Active Users"
            options={activeUsers}
            series={activeUsersSeries}
            type="line"
          />
        </Col>
        <Col lg="4" md="6" sm="12">
          <StatisticsCard
            iconRight
            icon={<Mail className="warning" size={22} />}
            iconBg="warning"
            stat="28.7k"
            statTitle="Newsletter"
            options={newsLetter}
            series={newsLetterSeries}
            type="line"
          />
        </Col>
      </Row>
    </>
  );
}
