import React, { useContext, useState, useEffect } from 'react';
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import * as Icon from 'react-feather';
import { history } from '../../history';
import { LayoutContext } from '../../state/layout/Context';
import { CHANGE_MODE } from '../../state/layout/Constants';
import Notification from './Notification';
import Avatar from '../Avatar';
import addresses, {
  RINKEBY_ID,
  getParcelWalletAddress,
} from '../../utility/addresses';

export default function NavbarUser({ userImg, userName }: any) {
  const { layout, dispatch } = useContext(LayoutContext);
  const { deactivate, library, chainId, account } = useWeb3React<
    Web3Provider
  >();
  const [ENSName, setENSName] = useState<string>('');

  function signOut() {
    deactivate();
    history.push('/');
  }

  useEffect(() => {
    if (library && account) {
      let stale = false;
      library
        .lookupAddress(account)
        .then((name) => {
          console.log('name:', name);
          if (!stale && typeof name === 'string') setENSName(name);
        })
        .catch(() => {});

      return (): void => {
        stale = true;
        setENSName('');
      };
    }
  }, [library, account, chainId]);

  const parcelWalletAddress = getParcelWalletAddress();
  console.log('parcelWalletAddress:', parcelWalletAddress);
  useEffect(() => {
    if (library && account && parcelWalletAddress) {
      let stale = false;
      library
        .lookupAddress('0xE1E2799D40f62d68D829469E59415aA1ba75F56E')
        .then((name) => {
          console.log('name:', name);
          if (!stale && typeof name === 'string') {
            console.log('name:', name);
          }
        })
        .catch(() => {});
      return (): void => {
        stale = true;
      };
    }
  }, [library, account, parcelWalletAddress]);

  return (
    <ul className="nav navbar-nav navbar-nav-user float-right">
      {/* <Button
        outline
        color="flat-primary"
        onClick={() => dispatch({ type: CHANGE_MODE, mode: 'light' })}
      >
        {layout.theme === 'dark' ? (
          <Icon.Sun size={21} />
        ) : (
          <Icon.Moon size={21} />
        )}
      </Button> */}
      <Notification />
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle tag="a" className="nav-link dropdown-user-link">
          {/* <div className="user-nav d-sm-flex d-none">
            <span className="user-name text-bold-600">{userName}</span>
            <span className="user-status">Available</span>
          </div> */}
          <span data-tour="user">
            <Avatar
              color="primary"
              content={ENSName.charAt(0).toUpperCase() || `-`}
              status="online"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="#">
            <Icon.User size={14} className="mr-50" />
            <span className="align-middle">Edit Profile</span>
          </DropdownItem>

          <DropdownItem divider />
          <DropdownItem tag="a" href="#" onClick={() => signOut()}>
            <Icon.Power size={14} className="mr-50" />
            <span className="align-middle">Log Out</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </ul>
  );
}
