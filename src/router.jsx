import { createBrowserRouter } from 'react-router-dom';

import Profile from './pages/profile';
import Layout from './components/layout/Layout';
import Explore from './pages/Explore';
import Auth from './pages/auth';
import Details from './pages/Details';
import './styles/global.css';
import Stripe from './pages/Stripe';

const router = createBrowserRouter([
  {
    path: '/explore',
    element: <Explore />,
    children: [
      {
        path: '/:id',
        element: <Details />,
      },
    ],
  },
  {
    path: '/stripe',
    element: <Stripe />,
  },
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        path: '/:id',
        element: <Profile />,
      },
      {
        path: '/',
        element: <Auth />,
      },
    ],
  },
]);

export default router;
