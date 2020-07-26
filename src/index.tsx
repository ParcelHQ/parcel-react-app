import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './utility/context/Layout';
import Spinner from './components/Spinner/Fallback-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<Spinner />}>
    <Layout>
      <LazyApp />
    </Layout>
  </Suspense>,
  document.getElementById('root')
);
