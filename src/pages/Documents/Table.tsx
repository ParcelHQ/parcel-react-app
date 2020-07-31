import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import { v4 as uuidv4 } from 'uuid';

export default function Table({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
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
              Header: 'Owner',
              accessor: 'owner',
            },
            {
              Header: 'File Size',
              accessor: 'size',
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
