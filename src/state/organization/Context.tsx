import React, { createContext, ReactNode, useReducer } from 'react';
import { CREATE_PARCEL_WALLET } from './Constants';
import OrganizationReducer from './Reducers';
import addresses, { RINKEBY_ID } from '../../utility/addresses';
import { useContract } from '../../hooks';
import ParcelWallet from '../../abis/ParcelWallet.json';

export const OrganizationContext = createContext<any>({ Organization: [] });

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [parcelWalletAddress, dispatch] = useReducer(OrganizationReducer, []);

  const createParcelWallet = (organization: any) => {
    dispatch({
      type: CREATE_PARCEL_WALLET,
      payload: organization,
    });
  };

  const parcelWalletContract = useContract(
    addresses[RINKEBY_ID].parcelWallet,
    ParcelWallet,
    true
  );

  return (
    <OrganizationContext.Provider
      value={{ parcelWalletAddress, createParcelWallet }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
