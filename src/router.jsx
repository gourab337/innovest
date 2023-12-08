import { createBrowserRouter } from 'react-router-dom';

import Profile from './pages/profile';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
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
