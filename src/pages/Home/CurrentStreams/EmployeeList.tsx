import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'react-feather';
import { Progress } from 'reactstrap';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

import { shortenAddress } from '../../../utility';
import { ReactComponent as DAILogo } from '../../../assets/currency/dai.svg';
import { ReactComponent as USDCLogo } from '../../../assets/currency/usdc.svg';

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const ListElement = styled.li``;

const NumericData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Address = styled.p`
  margin-bottom: 0.5rem;
`;

const Percentage = styled.h4``;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountAndCurrency = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Amount = styled.span`
  vertical-align: top;
  margin-right: 1rem;
`;

const Rate = styled.span`
  color: lightgray;
`;

const EmployeeList = ({ employeeStreams }: any) => {
  return (
    <List>
      {employeeStreams &&
        employeeStreams.map((employee: any) => {
          const totalAmountToStream = employee.salary;
          const currency = employee.currencySalary;
          const address = employee.address;
          const streamRate = employee.rate;
          let percentage = employee.percentage;
          if (percentage >= 100) {
            percentage = 100;
          }

          return (
            <ListElement key={uuid()}>
              <NumericData>
                <LeftDiv>
                  <Address>{address ? shortenAddress(address) : '-'}</Address>
                  <Percentage>
                    {percentage ? `${percentage} %` : '-'}
                  </Percentage>
                </LeftDiv>
                <RightDiv>
                  <AmountAndCurrency>
                    <Amount>
                      {totalAmountToStream ? totalAmountToStream : '-'}
                    </Amount>
                    {currency &&
                    currency ===
                      '0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8' ? (
                      <DAILogo
                        style={{
                          height: '1.5rem',
                          marginBottom: '0.1rem',
                        }}
                      />
                    ) : currency === 'USDC' ? (
                      <USDCLogo
                        style={{ height: '1.5rem', marginBottom: '0.1rem' }}
                      />
                    ) : (
                      '-'
                    )}
                  </AmountAndCurrency>
                  <Rate>
                    {streamRate ? `${streamRate.toFixed(5)} / SEC` : '-'}
                  </Rate>
                </RightDiv>
              </NumericData>
              <Progress className="mb-2" value={percentage} />
            </ListElement>
          );
        })}
    </List>
  );
};

export default EmployeeList;
