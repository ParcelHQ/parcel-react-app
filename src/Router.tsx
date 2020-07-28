import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import Spinner from './components/Spinner/Loading-spinner';
import { LayoutContext } from './state/layout/Context';
import { useEagerConnect, useInactiveListener } from './hooks';

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Accounting = lazy(() => import('./pages/accounting'));
const Payroll = lazy(() => import('./pages/payroll'));
const Documents = lazy(() => import('./pages/documents'));
const People = lazy(() => import('./pages/people'));
const Settings = lazy(() => import('./pages/settings'));
const Landing = lazy(() => import('./pages/landing'));
const Create = lazy(() => import('./pages/create'));
const Organizations = lazy(() => import('./pages/organizations'));
const Employer = lazy(() => import('./pages/employer'));

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
  return (
    <Router history={history}>
      <Switch>
        <AppRoute exact path="/" component={Home} />
        <AppRoute path="/about" component={About} />
        <AppRoute path="/accounting" component={Accounting} />
        <AppRoute path="/documents" component={Documents} />
        <AppRoute path="/people" component={People} />
        <AppRoute path="/payroll" component={Payroll} />
        <AppRoute path="/settings" component={Settings} />
        <AppRoute path="/landing" component={Landing} fullLayout />
        <AppRoute path="/organizations" component={Organizations} fullLayout />
        <AppRoute path="/create" component={Create} fullLayout />
        <AppRoute path="/employer" component={Employer} fullLayout />
      </Switch>
    </Router>
  );
}
