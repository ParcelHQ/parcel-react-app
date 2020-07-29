import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { history } from './history';
import Spinner from './components/Spinner/Loading-spinner';
import { LayoutContext } from './state/layout/Context';
import { useEagerConnect, useInactiveListener } from './hooks';

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

  return (
    <Router history={history}>
      <Switch>
        {/* <AppRoute
          exact
          path="/"
          render={() => {
            return triedEager ? (
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
