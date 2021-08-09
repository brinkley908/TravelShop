import React from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react'
import AppProvider from './components/provider/AppProvider'
import AppRouter from './AppRouter';
import './css/App.css';

function App() {
  
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default withAuthenticator(App);
