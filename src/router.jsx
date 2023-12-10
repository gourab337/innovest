import { createBrowserRouter } from 'react-router-dom';

import Profile from './pages/profile';
import Layout from './components/layout/Layout';
import Explore from './pages/Explore';
import Details from './pages/Details';
import './styles/global.css';
import Stripe from './pages/Push';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/explore/:id',
    element: <Details />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/push',
    element: <Stripe />,
  },
  ,
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        path: '/:id',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
