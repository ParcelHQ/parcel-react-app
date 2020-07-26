import React, { createContext, useState, useEffect } from 'react';
import LoggedInLayout from '../../layouts/LoggedInLayout';
import LoggedOutLayout from '../../layouts/LoggedOutLayout';
import themeConfig from '../../configs/themeConfig';
const layouts = {
  vertical: LoggedInLayout,
  full: LoggedOutLayout,
};

//@ts-ignore
export const ContextLayout = createContext();

export function Layout({ children }: any) {
  const [activeLayout, setActiveLayout] = useState(themeConfig.layout);
  const [width, setWidth] = useState(window.innerWidth);
  const [lastLayout, setLastLayout] = useState<null | string>(null);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      if (activeLayout === 'horizontal' && width <= 1199) {
        setActiveLayout('vertical');
        setLastLayout('horizontal');
      }

      if (lastLayout === 'horizontal' && width >= 1199) {
        setActiveLayout('horizontal');
        setLastLayout('vertical');
      }
    };

    //@ts-ignore
    if (window !== 'undefined')
      window.addEventListener('resize', handleWindowResize);

    document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
    if (activeLayout === 'horizontal' && width <= 1199)
      setActiveLayout('vertical');
    else if (themeConfig.layout === 'horizontal' && width >= 1200)
      setActiveLayout('horizontal');
    else setActiveLayout('vertical');
  }, [width, activeLayout, lastLayout]);

  return (
    <ContextLayout.Provider
      value={{
        state: { activeLayout, width, lastLayout },
        fullLayout: layouts['full'],
        LoggedInLayout: layouts['vertical'],
      }}
    >
      {children}
    </ContextLayout.Provider>
  );
}
