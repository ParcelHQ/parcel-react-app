import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsCard from '../../components/StatisticsCard';
import { Cpu, Server, Activity, AlertOctagon } from 'react-feather';
import { ReactComponent as ETHLogo } from '../../assets/currency/eth.svg';
import { ReactComponent as DAILogo } from '../../assets/currency/dai.svg';
import { ReactComponent as USDCLogo } from '../../assets/currency/usdc.svg';
import { ReactComponent as USDTLogo } from '../../assets/currency/usdt.svg';

export default function StatisticsCards() {
  return (
    <Row>
      <Col lg="3" sm="6">
        <StatisticsCard
          hideChart
          iconRight
          iconBg="primary"
          // icon={<Cpu className="primary" size={22} />}
          icon={<ETHLogo />}
          stat="52.3"
          statTitle="ETH"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatisticsCard
          hideChart
          iconRight
          iconBg="primary"
          // icon={<Server className="primary" size={22} />}
          icon={<DAILogo />}
          stat="5000"
          statTitle="DAI"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatisticsCard
          hideChart
          iconRight
          iconBg="primary"
          // icon={<Activity className="primary" size={22} />}
          icon={<USDCLogo />}
          stat="4000"
          statTitle="USDC"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatisticsCard
          hideChart
          iconRight
          iconBg="primary"
          // icon={<AlertOctagon className="primary" size={22} />}
          icon={<USDTLogo />}
          stat="3000"
          statTitle="USDT"
        />
      </Col>
    </Row>
  );
}
