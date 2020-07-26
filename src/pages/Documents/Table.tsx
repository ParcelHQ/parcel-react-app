import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';

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
              id: 'fileSize',
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
