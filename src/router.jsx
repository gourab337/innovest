import { createBrowserRouter } from 'react-router-dom';

import Profile from './pages/profile';
import Layout from './components/layout/Layout';
import Explore from './pages/Explore';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/explore/details',
    element: <Details />,
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
        element: <h1 className='text-white'>go to /:id</h1>,
      },
    ],
  },
]);

export default router;
