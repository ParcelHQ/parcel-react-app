import React, { ReactNode } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'reactstrap';

import { injected } from '../utility/connectors';
import { useEagerConnect, useInactiveListener } from '../hooks';

export default function AuthWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { account, active, error, activate } = useWeb3React<Web3Provider>();

  return (
    <>
      {active && !error && !!account ? null : (
        <Button
          onClick={() => activate(injected)}
          disabled={!triedEager || !!error}
        >
          Connect
        </Button>
      )}
      {children}
    </>
  );
}
