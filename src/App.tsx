import React from 'react';
import Router from './Router';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { LayoutProvider } from './state/layout/Context';

export default function App() {
  return (
    <LayoutProvider>
      <Router />
    </LayoutProvider>
  );
}
