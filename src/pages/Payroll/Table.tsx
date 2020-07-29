import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import { v4 as uuidv4 } from 'uuid';

export default function Table({ data }: any) {
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
              id: 'salary',
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
