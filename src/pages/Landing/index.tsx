import React from 'react';
import { CardBody } from 'reactstrap';
import Logo from '../../assets/img/logo/logoPng.png';
import * as Icons from 'react-feather';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

const Box = styled.div`
  display: flex;
  direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 640px;
  margin: auto;
  width: 50%;
`;

const StyledButton = styled.button`
  height: 96px;
  width: auto;
  background: white;
  border: 2px solid #d3d3d3;
  border-radius: 6px;
  text-align: center;
  width: 16rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  &:hover {
    border: 2px solid #6f6be9;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-5px);
  }
`;

export default function Landing() {
  const { active } = useWeb3React<Web3Provider>();
  let history = useHistory();

  return (
    <Box>
      <CardBody className="text-center">
        <img
          src={Logo}
          alt="Parcel Logo"
          className="img-fluid align-self-center"
          style={{ height: '8rem' }}
        />

        <h1 className="font-large-3 my-1">
          Welcome to <span style={{ color: '#6F6BE9' }}>Parcel</span>
        </h1>
        <h1 className="font-large-1 my-1">Manage Crypto Payroll Seamlessly</h1>
        <ButtonWrapper>
          <StyledButton
            disabled={!active}
            style={{ marginBottom: '1rem' }}
            onClick={() => history.push('/employer')}
          >
            <Icons.UserPlus size={15} style={{ marginRight: '0.5rem' }} />
            Sign in as Employer
          </StyledButton>

          <StyledButton
            disabled={!active}
            onClick={() => history.push('/organizations')}
          >
            <Icons.Users size={15} style={{ marginRight: '0.5rem' }} />
            Sign in as Employee
          </StyledButton>
        </ButtonWrapper>
      </CardBody>
    </Box>
  );
}
