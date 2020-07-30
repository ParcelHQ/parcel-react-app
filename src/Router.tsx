import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useContract } from './hooks';
import addresses, { RINKEBY_ID } from './utility/addresses';
import ParcelFactoryContract from './abis/ParcelFactory.json';
import { history } from './history';
import Spinner from './components/Spinner/Loading-spinner';
import { LayoutContext } from './state/layout/Context';
import { useEagerConnect, useInactiveListener } from './hooks';
import { ZERO_ADDRESS } from './utility/constants';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Accounting = lazy(() => import('./pages/Accounting'));
const Payroll = lazy(() => import('./pages/Payroll'));
const Documents = lazy(() => import('./pages/Documents'));
const People = lazy(() => import('./pages/People'));
const Settings = lazy(() => import('./pages/Settings'));
const Landing = lazy(() => import('./pages/SignIn'));
const Create = lazy(() => import('./pages/Create'));
const Organizations = lazy(() => import('./pages/Organizations'));
const Employer = lazy(() => import('./pages/Employer'));

const AppRoute = ({ component: Component, fullLayout, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) => {
      return (
        <LayoutContext.Consumer>
          {(context: any) => {
            let LayoutTag =
              fullLayout === true ? context.fullLayout : context.LoggedInLayout;
            return (
              <LayoutTag {...props}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </LayoutContext.Consumer>
      );
    }}
  />
);

export default function AppRouter() {
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const { account } = useWeb3React<Web3Provider>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const parcelFactoryContract = useContract(
    addresses[RINKEBY_ID].parcelFactory,
    ParcelFactoryContract.abi,
    true
  );

  useEffect(() => {
    let isStale = false;
    if (!isStale && parcelFactoryContract) {
      (async () => {
        let res = await parcelFactoryContract.registered(account);
        console.log(typeof res);

        //If they are not registed
        if (res !== ZERO_ADDRESS) {
          console.log('ZERO_ADDRESS:', ZERO_ADDRESS);
          setIsRegistered(true);
        }
        setLoaded(true);
      })();
    }

    return () => {
      isStale = true;
    };
  }, [parcelFactoryContract, account]);

  return (
    <Router history={history}>
      <Switch>
        {/* <AppRoute
          exact
          path="/"
          render={() => {
            return isRegistered ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/signin" />
            );
          }}
        /> */}
        <AppRoute exact path="/" component={Home} />
        <AppRoute path="/about" component={About} />
        <AppRoute path="/accounting" component={Accounting} />
        <AppRoute path="/documents" component={Documents} />
        <AppRoute path="/people" component={People} />
        <AppRoute path="/payroll" component={Payroll} />
        <AppRoute path="/settings" component={Settings} />
        <AppRoute path="/signin" component={Landing} fullLayout />
        <AppRoute path="/organizations" component={Organizations} fullLayout />
        <AppRoute path="/create" component={Create} fullLayout />
        <AppRoute path="/employer" component={Employer} fullLayout />
      </Switch>
    </Router>
  );
}
