import React, { useState, useEffect } from 'react';
import { Navbar } from 'reactstrap';
import classnames from 'classnames';
import NavbarUser from './NavbarUser';
import { NavItem, NavLink, Badge } from 'reactstrap';
import * as Icon from 'react-feather';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import styled from '@emotion/styled';

const IDWrapper = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function ThemeNavbar({
  handleAppOverlay,
  sidebarVisibility,
  horizontal,
  scrolling,
}: any) {
  const navbarType = 'floating';
  const navbarColor = 'default';
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden'];

  const { library, chainId, account } = useWeb3React<Web3Provider>();

  const [ENSName, setENSName] = useState<string>('');

  useEffect(() => {
    if (library && account) {
      let stale = false;
      library
        .lookupAddress(account)
        .then((name) => {
          if (!stale && typeof name === 'string') setENSName(name);
        })
        .catch(() => {});
      return (): void => {
        stale = true;
        setENSName('');
      };
    }
  }, [library, account, chainId]);

  return (
    <>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          'header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow',
          {
            'navbar-light': !colorsArr.includes(navbarColor),
            'navbar-dark': colorsArr.includes(navbarColor),

            'floating-nav':
              (navbarType === 'floating' && !horizontal) ||
              (!navbarTypes.includes(navbarType) && !horizontal),

            'fixed-top': horizontal,
            scrolling: horizontal && scrolling,
          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper">
                <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                  <ul className="navbar-nav d-xl-none">
                    <NavItem className="mobile-menu mr-auto">
                      <NavLink
                        className="nav-menu-main menu-toggle hidden-xs is-active"
                        onClick={sidebarVisibility}
                      >
                        <Icon.Menu className="ficon" />
                      </NavLink>
                    </NavItem>
                    <NavItem className="mobile-menu mr-auto">
                      <NavLink
                        className="nav-menu-main menu-toggle hidden-xs is-active"
                        onClick={sidebarVisibility}
                      >
                        <IDWrapper>
                          {ENSName && (
                            <Badge className="badge-md" color="primary">
                              <span>{`Hello ${ENSName}!`}</span>
                            </Badge>
                          )}
                        </IDWrapper>
                      </NavLink>
                    </NavItem>
                  </ul>
                </div>
              </div>

              <NavbarUser handleAppOverlay={handleAppOverlay} />
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}
