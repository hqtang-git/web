import { redirect, RouteObject } from 'react-router-dom';

import { EmptyContent } from '@/common/components/empty';
import { Table as DutyTable } from '@/components/duty-table';
import { Table as UserTable } from '@/components/user-table';

import { NavBar } from '../layout/nav-bar';
import * as PathPattern from './path-pattern';


export type RouteItemProps = RouteObject & {
  id: string;
  path: string;
  title: string;
  redirect?: boolean;
  routes?: RouteItemProps[];
  breadcrumb?: string;
  routeMatchPath?: string;
  hidden?: boolean;
};

export const routes = [
  {
    path: '/',
    Component: NavBar,
    children: [
      {
        index: true,
        loader: () => redirect(`/${PathPattern.DUTY}`),
      },
      {
        id: PathPattern.APPROVAL,
        path: `/${PathPattern.APPROVAL}`,
        Component: () => <EmptyContent />,
      },
      {
        id: PathPattern.USER,
        path: `/${PathPattern.USER}`,
        children: [
          {
            index: true,
            loader: () => redirect(`/${PathPattern.USER}/user-detail`),
          },
          {
            id: `${PathPattern.USER}/user-detail`,
            path: `/${PathPattern.USER}/user-detail`,
            Component: () => <UserTable />
          }
        ],
      },
      {
        id: PathPattern.DUTY,
        path: `/${PathPattern.DUTY}`,
        children: [
          {
            index: true,
            loader: () => redirect(`/${PathPattern.DUTY}/current-month`),
          },
          {
            id: `${PathPattern.DUTY}/current-month`,
            path: `/${PathPattern.DUTY}/current-month`,
            Component: () => <DutyTable />
          }
        ],
      },
    ],
  },
];
