/* eslint-disable prefer-object-spread */
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
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
import { Permission } from './state/AccessBasedOnPemissionsState';

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  if (accessPermissions.get('ViewAccounts')) {
    routes.push(...accountRoutes);
  }

  if (accessPermissions.get('ManageAccounts')) {
    routes.push(...accountManagementRoutes);
  }

  if (accessPermissions.get('ManageRoles')) {
    routes.push(...roleRoutes);
  }

  if (accessPermissions.get('CanManageTenants')) {
    routes.push(...tenantRoutes);
  }

  return routes;
}

export function getSidebarRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    label: string;
    iconMini: ReactNode;
  }[] = [];

  if (accessPermissions.get('ViewAccounts')) {
    routes.push(sidebarAccounts);
  }

  if (accessPermissions.get('ViewRoles')) {
    routes.push(sidebarRoles);
  }

  if (accessPermissions.get('CanManageTenants')) {
    routes.push(sidebarTenants);
  }

  return routes;
}
