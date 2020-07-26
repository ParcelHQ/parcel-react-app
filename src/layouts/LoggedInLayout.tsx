import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import Sidebar from './components/menu/Sidebar';
import Navbar from './components/navbar/Navbar';
import { LayoutContext } from '../state/layout/Context';

export default function LoggedInLayout({ children, match }: any) {
  const { layout } = useContext(LayoutContext);

  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarState, setSidebarState] = useState(true); //!CHANGE
  const [collapsedContent, setCollapsedContent] = useState(true); //!CHANGE
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [appOverlay, setAppOverlay] = useState(false);

  //@ts-ignore
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      window.addEventListener(
        'resize',
        () => setWidth(window.innerWidth),
        false
      );

      document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout.theme === 'dark'
        ? document.body.classList.add('dark-layout')
        : null;
    }

    return () => {
      mounted = false;
      window.removeEventListener(
        'resize',
        () => setWidth(window.innerWidth),
        false
      );
    };
  }, [layout.theme]);

  function toggleSidebarMenu() {
    setSidebarState(!sidebarState);
    setCollapsedContent(!collapsedContent);
  }

  function handleSidebarVisibility() {
    if (window !== undefined) {
      window.addEventListener('resize', () => {
        if (sidebarHidden) setSidebarHidden(!sidebarHidden);
      });
    }
    setSidebarHidden(!sidebarHidden);
  }

  function handleAppOverlay(value: any) {
    if (value.length > 0) setAppOverlay(true);
    else if (value.length < 0 || value === '') setAppOverlay(false);
  }

  return (
    <div
      className={classnames('wrapper vertical-layout theme-primary', {
        'menu-collapsed': collapsedContent === true && width >= 1200,
        'navbar-floating': true,
      })}
    >
      <Sidebar
        toggle={toggleSidebarMenu}
        sidebarState={sidebarState}
        sidebarHover={(val: any) => setSidebarState(val)}
        sidebarVisibility={handleSidebarVisibility}
        visibilityState={sidebarHidden}
        activePath={match.path}
        collapsed={collapsedContent}
        deviceWidth={width}
      />

      <div
        className={classnames('app-content content', {
          'show-overlay': appOverlay === true,
        })}
        onClick={() => setAppOverlay(false)}
      >
        <Navbar
          toggleSidebarMenu={toggleSidebarMenu}
          sidebarState={sidebarState}
          sidebarVisibility={handleSidebarVisibility}
          handleAppOverlay={handleAppOverlay}
          appOverlayState={appOverlay}
        />

        <div className="content-wrapper">{children}</div>
      </div>

      <div
        className="sidenav-overlay"
        onClick={() => handleSidebarVisibility()}
      />
    </div>
  );
}
