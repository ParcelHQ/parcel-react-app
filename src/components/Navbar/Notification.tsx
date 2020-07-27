import React from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Media,
  Badge,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Icon from 'react-feather';

const Notification = () => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item">
      <DropdownToggle tag="a" className="nav-link nav-link-label">
        <Icon.Bell size={21} />
        <Badge pill color="primary" className="badge-up">
          {' '}
          5{' '}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag="ul" right className="dropdown-menu-media">
        <li className="dropdown-menu-header">
          <div className="dropdown-header mt-0">
            <h3 className="text-white">5 New</h3>
            <span className="notification-title">App Notifications</span>
          </div>
        </li>
        <PerfectScrollbar
          className="media-list overflow-hidden position-relative"
          options={{
            wheelPropagation: false,
          }}
        >
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <Icon.PlusSquare className="font-medium-5 primary" size={21} />
              </Media>
              <Media body>
                <Media heading className="primary media-heading" tag="h6">
                  You have new order!
                </Media>
                <p className="notification-text">
                  Are your going to meet me tonight?
                </p>
              </Media>
              <small>
                <time
                  className="media-meta"
                  dateTime="2015-06-11T18:29:20+08:00"
                >
                  9 hours ago
                </time>
              </small>
            </Media>
          </div>
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <Icon.DownloadCloud
                  className="font-medium-5 success"
                  size={21}
                />
              </Media>
              <Media body>
                <Media heading className="success media-heading" tag="h6">
                  99% Server load
                </Media>
                <p className="notification-text">You got new order of goods?</p>
              </Media>
              <small>
                <time
                  className="media-meta"
                  dateTime="2015-06-11T18:29:20+08:00"
                >
                  5 hours ago
                </time>
              </small>
            </Media>
          </div>
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <Icon.AlertTriangle
                  className="font-medium-5 danger"
                  size={21}
                />
              </Media>
              <Media body>
                <Media heading className="danger media-heading" tag="h6">
                  Warning Notification
                </Media>
                <p className="notification-text">Server has used 99% of CPU</p>
              </Media>
              <small>
                <time
                  className="media-meta"
                  dateTime="2015-06-11T18:29:20+08:00"
                >
                  Today
                </time>
              </small>
            </Media>
          </div>
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <Icon.CheckCircle className="font-medium-5 info" size={21} />
              </Media>
              <Media body>
                <Media heading className="info media-heading" tag="h6">
                  Complete the task
                </Media>
                <p className="notification-text">
                  One of your task is pending.
                </p>
              </Media>
              <small>
                <time
                  className="media-meta"
                  dateTime="2015-06-11T18:29:20+08:00"
                >
                  Last week
                </time>
              </small>
            </Media>
          </div>
          <div className="d-flex justify-content-between">
            <Media className="d-flex align-items-start">
              <Media left href="#">
                <Icon.File className="font-medium-5 warning" size={21} />
              </Media>
              <Media body>
                <Media heading className="warning media-heading" tag="h6">
                  Generate monthly report
                </Media>
                <p className="notification-text">
                  Reminder to generate monthly report
                </p>
              </Media>
              <small>
                <time
                  className="media-meta"
                  dateTime="2015-06-11T18:29:20+08:00"
                >
                  Last month
                </time>
              </small>
            </Media>
          </div>
        </PerfectScrollbar>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
