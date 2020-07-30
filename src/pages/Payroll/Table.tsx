import React from 'react';
import { Card, CardBody } from 'reactstrap';
import ReactTable from 'react-table';

export default function Table({ data }: any) {
  console.log('data:', data);
  return (
    <Card>
      <CardBody>
        {/* @ts-ignore */}
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Currency',
              accessor: 'currency',
            },
            {
              Header: 'Salary',
              accessor: 'salary',
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
