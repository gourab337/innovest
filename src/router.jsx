import { createBrowserRouter } from 'react-router-dom';

import Profile from './pages/profile';
import Layout from './components/layout/Layout';
import Explore from './pages/Explore';
import Auth from './pages/auth';

const router = createBrowserRouter([
  {
    path: '/explore',
    element: <Explore />,
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
