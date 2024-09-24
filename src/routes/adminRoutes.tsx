/* eslint-disable prefer-object-spread */
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
// import { analyticsSidebarRoutes } from '../features/analytics/routes';
import { ReactNode } from 'react';
import {
  accountManagementRoutes,
  accountRoutes,
  roleRoutes,
  sidebarAccounts,
  sidebarRoles,
  sidebarTenants,
  tenantRoutes,
} from '../features/account-management/routes';
// import { Permission } from './state/AccessBasedOnPemissionsState';

export function getAdminRoutes() {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  // if (accessPermissions.get('ViewAccounts')) {
  routes.push(...accountRoutes);
  // }

  // if (accessPermissions.get('ManageAccounts')) {
  routes.push(...accountManagementRoutes);
  // }

  // if (accessPermissions.get('ManageRoles')) {
  routes.push(...roleRoutes);
  // }

  // if (accessPermissions.get('CanManageTenants')) {
  routes.push(...tenantRoutes);
  // }

  return routes;
}

export function getSidebarRoutes() {
  const routes: {
    path: string;
    label: string;
    iconMini: ReactNode;
  }[] = [];

  routes.push(sidebarAccounts);

  routes.push(sidebarRoles);

  routes.push(sidebarTenants);

  return routes;
}
