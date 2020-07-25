import React from 'react';
import StatisticsCard from '../../components/StatisticsCard';
import { Monitor } from 'react-feather';
import { siteTraffic, siteTrafficSeries } from '../../data/StatisticsData2';
import ReactTables from '../../components/Tables/ReactTables';

export default function Home() {
  return (
    <>
      <StatisticsCard
        iconRight
        icon={<Monitor className="primary" size={22} />}
        stat="78.9k"
        statTitle="Site Traffic"
        options={siteTraffic}
        series={siteTrafficSeries}
        type="line"
      />
      <ReactTables />
    </>
  );
}
