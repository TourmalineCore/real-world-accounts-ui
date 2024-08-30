/* eslint-disable prefer-object-spread */
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
// import { analyticsSidebarRoutes } from '../features/analytics/routes';
import {
  accountManagementRoutes,
  accountRoutes,
  roleRoutes,
  sidebarAccountManagements,
  sidebarAccounts,
  sidebarRoles,
  sidebarTenants,
  tenantRoutes,
} from '../features/account-management/routes';
import { SidebarRoutesProps } from '../types';
import { Permission } from './state/AccessBasedOnPemissionsState';

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  // if (accessPermissions.get('ViewAccounts')) {
  routes.push(...accountRoutes);
  // }

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
  const routes: SidebarRoutesProps[] = [];

  const copyAccountManagement = Object.assign({}, sidebarAccountManagements);

  if (accessPermissions.get('ViewAccounts') && accessPermissions.get('ViewRoles') && accessPermissions.get('CanManageTenants')) {
    copyAccountManagement.routes = [sidebarAccounts, sidebarRoles, sidebarTenants];

    routes.push(copyAccountManagement);

    return routes;
  }

  if (accessPermissions.get('ViewAccounts')) {
    copyAccountManagement.routes = [sidebarAccounts];

    routes.push(copyAccountManagement);
    return routes;
  }

  if (accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [sidebarRoles];

    routes.push(copyAccountManagement);
    return routes;
  }

  if (accessPermissions.get('CanManageTenants')) {
    copyAccountManagement.routes = [sidebarTenants];

    routes.push(copyAccountManagement);
    return routes;
  }

  return routes;
}
