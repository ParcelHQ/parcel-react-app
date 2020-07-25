import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import { makeData } from './TableData';

export default function SimpleTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple</CardTitle>
      </CardHeader>
      <CardBody>
        {/* @ts-ignore */}
        <ReactTable
          data={makeData()}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: (d: any) => d.lastName,
                },
              ],
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                },
              ],
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: 'Visits',
                  accessor: 'visits',
                },
              ],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </CardBody>
    </Card>
  );
}
