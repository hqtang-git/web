import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './app-routes';

export const AppRouterProvider = ({ basename }) => {
  const router = useMemo(() => createBrowserRouter(routes as any, { basename }), [basename]);

  return <RouterProvider router={router} />;
};
