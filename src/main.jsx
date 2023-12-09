import './init';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import router from './router';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import AuthContextProvider from './store/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AuthContextProvider>
);
