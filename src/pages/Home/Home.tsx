import React from 'react';
import StatisticsCard from './StatisticsCard';
import CurrentStreams from './CurrentStreams';
import Table from '../../components/Tables/ReactTables';

import { makeData } from './TableData';

export default function Home() {
  return (
    <>
      <StatisticsCard />

      <CurrentStreams />

      <Table data={makeData()} title={'Recent Activity'} />
    </>
  );
}
