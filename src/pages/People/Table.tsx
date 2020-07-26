import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';

export default function Table({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Employees</CardTitle>
      </CardHeader>
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
              Header: 'Address/ENS',
              accessor: 'addressOrEns',
            },
            {
              Header: 'Currency',
              id: 'currency',
            },
            {
              Header: 'Salary',
              id: 'salary',
            },
            {
              Header: 'Actions',
              id: 'actions',
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
