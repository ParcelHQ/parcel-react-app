import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import { connect } from 'react-redux';
import Spinner from './components/Spinner/Loading-spinner';
import { ContextLayout } from './utility/context/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Accounting = lazy(() => import('./pages/Accounting'));
const Payroll = lazy(() => import('./pages/Payroll'));
const CompanyDetails = lazy(() => import('./pages/CompanyDetails'));
const Documents = lazy(() => import('./pages/Documents'));
const People = lazy(() => import('./pages/People'));
const Settings = lazy(() => import('./pages/Settings'));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props: any) => {
      return (
        <ContextLayout.Consumer>
          {(context: any) => {
            let LayoutTag =
              fullLayout === true ? context.fullLayout : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state: any) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

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
      </Switch>
    </Router>
  );
}
