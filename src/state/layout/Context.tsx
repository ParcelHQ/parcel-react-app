import React, { createContext, ReactNode, useReducer } from 'react';
import { LayoutReducer } from './Reducers';

const initialLayoutState: any = { theme: 'light', sidebarCollapsed: true };

export const LayoutContext = createContext<{
  layout: any;
  dispatch: any;
}>({ layout: '', dispatch: LayoutReducer });

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, dispatch] = useReducer(LayoutReducer, initialLayoutState);

  return (
    <LayoutContext.Provider value={{ layout, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};
