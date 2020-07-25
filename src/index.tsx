import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Layout } from './utility/context/Layout';
import { store } from './redux/storeConfig/store';
import Spinner from './components/Spinner/Fallback-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './@fake-db';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <Layout>
        <LazyApp />
      </Layout>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
