import React from 'react';
import { Card, CardHeader, CardTitle, Table } from 'reactstrap';

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <Table
        responsive
        className="dashboard-table table-hover-animation mb-0 mt-1"
      >
        <thead>
          <tr>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>RECEIVER</th>
            <th>REMARKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>28/07/2018</td>
            <td>Brennan.eth</td>
            <td>Paid Contractor Brennan Fife $545 for 'animation platfrom'</td>
            <td>$2500</td>
          </tr>
          <tr>
            <td>28/07/2018</td>
            <td>John.eth</td>
            <td>John Smith is requesting $324 for 'marketing campaign'</td>
            <td>$2500</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}
