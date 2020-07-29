import React, { useState } from 'react';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from 'reactstrap';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import { makeData } from './TableData';

export default function TabsFilled() {
  const [active, setActive] = useState('1');

  const toggle = (tab: any) => {
    if (active !== tab) setActive(tab);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardBody>
          <Nav tabs className="nav-fill">
            <NavItem>
              <NavLink
                className={classnames({
                  active: active === '1',
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                Engineering
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: active === '2',
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                Marketing
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({
                  active: active === '3',
                })}
                onClick={() => {
                  toggle('3');
                }}
              >
                Finance
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: active === '4',
                })}
                onClick={() => {
                  toggle('4');
                }}
              >
                HR
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <Table data={makeData()} />
            </TabPane>
            <TabPane tabId="2">
              <Table data={makeData()} />
            </TabPane>
            <TabPane tabId="3">
              <Table data={makeData()} />
            </TabPane>
            <TabPane tabId="4">
              <Table data={makeData()} />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
}
