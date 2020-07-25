import React from 'react';
import ReactTables from '../../components/Tables/ReactTables';
import StatisticsCard from './StatisticsCard';
import ProductOrders from './ProductOrders';
import Breadcrumbs from '../../components/BreadCrumbs';

export default function Home() {
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Statistics Cards"
        breadCrumbParent="Card"
        breadCrumbActive="Statistics Cards"
      />
      <StatisticsCard />

      <ProductOrders />
      <ReactTables />
    </>
  );
}
