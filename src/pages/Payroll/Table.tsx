import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { makeData } from './TableData';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

export default function FilterTable() {
  return (
    <Card>
      <CardBody>
        {/* @ts-ignore */}
        <ReactTable
          data={makeData()}
          filterable
          defaultFilterMethod={(filter: any, row: any) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                  filterMethod: (filter: any, row: any) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value),
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: (d: any) => d.lastName,
                  filterMethod: (filter: any, rows: any) =>
                    matchSorter(rows, filter.value, { keys: ['lastName'] }),
                  filterAll: true,
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
                  Header: 'Over 21',
                  accessor: 'age',
                  id: 'over',
                  Cell: ({ value }: any) => (value >= 21 ? 'Yes' : 'No'),
                  filterMethod: (filter: any, row: any) => {
                    if (filter.value === 'all') {
                      return true;
                    }
                    if (filter.value === 'true') {
                      return row[filter.id] >= 21;
                    }
                    return row[filter.id] < 21;
                  },
                  Filter: ({ filter, onChange }: any) => (
                    <select
                      onChange={(event) => onChange(event.target.value)}
                      style={{ width: '100%' }}
                      value={filter ? filter.value : 'all'}
                    >
                      <option value="all">Show All</option>
                      <option value="true">Can Drink</option>
                      <option value="false">Can't Drink</option>
                    </select>
                  ),
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
