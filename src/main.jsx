import './init';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { MetaMaskProvider } from '@metamask/sdk-react';

import router from './router';
import './index.css';

import AuthContextProvider from './store/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: 'Demo React App',
          url: window.location.host,
        },
      }}
    >
      <RouterProvider router={router} />
    </MetaMaskProvider>
  </AuthContextProvider>
);
