import React, { useState, useContext } from 'react';
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
  Button,
} from 'reactstrap';
import { EmployeeContext } from '../../state/employee/Context';
import Table from './Table';
import 'react-table/react-table.css';
import '../../assets/scss/plugins/extensions/react-tables.scss';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import MassPayout from '../../abis/MassPayouts.json';
import ParcelWallet from '../../abis/ParcelWallet.json';
import styled from '@emotion/styled';

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexButton = styled(Button)`
  margin: 0 5px;
`;

export default function TabsFilled() {
  const [active, setActive] = useState('1');

  const { employees } = useContext(EmployeeContext);

  const toggle = (tab: any) => {
    if (active !== tab) setActive(tab);
  };

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  const massPayoutsContract = useContract(
    addresses[RINKEBY_ID].massPayouts,
    MassPayout,
    true
  );

  async function massPayout() {
    const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const TOKENS_REQUESTED = [
      '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ];
    const EMPLOYEE_ADDRESSES = [
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
      '0x36eC99A4CA6F1a3E3299aEB94587F34A9E6adA1f',
    ];
    const VALUES_TO_SEND = ['100000000000000000', '100000000000000000'];

    // const toEncrypt = await massPayoutsContract!.massPayout(
    //   ETH_ADDRESS,
    //   TOKENS_REQUESTED,
    //   EMPLOYEE_ADDRESSES,
    //   VALUES_TO_SEND
    // );

    const MASSPAYOUT_ADDRESS = addresses[RINKEBY_ID].massPayouts;

    const DATA =
      '0x89f970ef000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000200000000000000000000000036ec99a4ca6f1a3e3299aeb94587f34a9e6ada1f00000000000000000000000036ec99a4ca6f1a3e3299aeb94587f34a9e6ada1f0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000016345785d8a0000';

    const result = await parcelWalletContract!.execute(
      [MASSPAYOUT_ADDRESS],
      [DATA]
    );
    console.log('result:', result);
  }

  const engineering: any[] = employees.filter((employee: any) => {
    return employee.department === 'engineering';
  });
  const marketing: any[] = employees.filter((employee: any) => {
    return employee.department === 'marketing';
  });
  const finance: any[] = employees.filter((employee: any) => {
    return employee.department === 'finance';
  });
  const hr: any[] = employees.filter((employee: any) => {
    return employee.department === 'hr';
  });

  return (
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
            <Table data={engineering} />
          </TabPane>
          <TabPane tabId="2">
            <Table data={marketing} />
          </TabPane>
          <TabPane tabId="3">
            <Table data={finance} />
          </TabPane>
          <TabPane tabId="4">
            <Table data={hr} />
          </TabPane>
        </TabContent>
        <FlexWrap>
          <FlexButton color="primary" disabled={true}>
            Stream
          </FlexButton>

          <FlexButton color="primary" outline onClick={() => massPayout()}>
            Pay
          </FlexButton>
        </FlexWrap>
      </CardBody>
    </Card>
  );
}
