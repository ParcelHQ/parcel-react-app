import React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Plus, AlertCircle } from 'react-feather';

export default function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payroll</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="activity-timeline timeline-left list-unstyled">
          <li>
            <div className="timeline-icon bg-primary">
              <Plus size={16} />
            </div>
            <div className="timeline-info">
              <p className="font-weight-bold mb-0">Client Meeting</p>
              <span className="font-small-3">
                Bonbon macaroon jelly beans gummi bears jelly lollipop apple
              </span>
            </div>
            <small className="text-muted">3 Hours</small>
          </li>
          <li>
            <div className="timeline-icon bg-primary">
              <AlertCircle size={16} />
            </div>
            <div className="timeline-info">
              <p className="font-weight-bold mb-0">Email Newsletter</p>
              <span className="font-small-3">
                Cupcake gummi bears soufflé caramels candy
              </span>
            </div>
            <small className="text-muted">15 days ago</small>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
