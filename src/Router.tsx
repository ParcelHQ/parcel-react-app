import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import Spinner from './components/Spinner/Loading-spinner';
import { LayoutContext } from './state/layout/Context';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Accounting = lazy(() => import('./pages/Accounting'));
const Payroll = lazy(() => import('./pages/Payroll'));
const CompanyDetails = lazy(() => import('./pages/CompanyDetails'));
const Documents = lazy(() => import('./pages/Documents'));
const People = lazy(() => import('./pages/People'));
const Settings = lazy(() => import('./pages/Settings'));
const Landing = lazy(() => import('./pages/Landing'));

// Set Layout and Component Using App Route
const AppRoute = ({ component: Component, fullLayout, ...rest }: any) => (
  <Route
    {...rest}
    render={(props: any) => {
      return (
        <LayoutContext.Consumer>
          {(context: any) => {
            console.log('context:', context);
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
  return (
    <Router history={history}>
      <Switch>
        <AppRoute exact path="/" component={Home} />
        <AppRoute path="/about" component={About} />
        <AppRoute path="/accounting" component={Accounting} />
        <AppRoute path="/companydetails" component={CompanyDetails} />
        <AppRoute path="/documents" component={Documents} />
        <AppRoute path="/people" component={People} />
        <AppRoute path="/payroll" component={Payroll} />
        <AppRoute path="/settings" component={Settings} />
        <AppRoute path="/landing" component={Landing} fullLayout />
      </Switch>
    </Router>
  );
}
