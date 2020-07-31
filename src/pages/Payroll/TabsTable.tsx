import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { EmployeeContext } from '../../state/employee/Context';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';

export default function TabsFilled({ departments }: any) {
  console.log('departments:', departments);
  const [active, setActive] = useState('1');

  const { employees } = useContext(EmployeeContext);

  const toggle = (tab: any) => {
    if (active !== tab) setActive(tab);
  };

  const engineering: any[] = employees.filter((employee: any) => {
    return employee.department === 'engineering';
  });
  const marketing: any[] = employees.filter((employee: any) => {
    return employee.department === 'marketing';
  });

  return (
    <>
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
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Table data={engineering} />
        </TabPane>
        <TabPane tabId="2">
          <Table data={marketing} />
        </TabPane>
      </TabContent>
    </>
  );
}
