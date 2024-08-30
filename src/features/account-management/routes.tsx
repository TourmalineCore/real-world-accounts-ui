import { ReactComponent as IconAccountManagement } from '../../assets/icons/icon-account-management.svg';

import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';
import EditAccount from './components/EditAccount/EditAccount';

import AccountsPage from './AccountsPage';
import AccountManagementPage from './AccountManagementPage';

import CreateTenant from './components/CreateTenant/CreateTenant';
import { TenantsPage } from './TenantsPage';

const DEFAULT_PATH = '/account-management';

export const accountManagementRoutes = [
  {
    path: `${DEFAULT_PATH}/accounts/add`,
    breadcrumb: 'Add new account',
    Component: CreateAccount,
  },
  {
    path: `${DEFAULT_PATH}/accounts/edit/:id`,
    breadcrumb: 'Edit an account',
    Component: EditAccount,
  },
  {
    path: `${DEFAULT_PATH}/tenants/add`,
    breadcrumb: 'Add new tenant',
    Component: CreateTenant,
  },

];

export const accountRoutes = [
  {
    path: `${DEFAULT_PATH}/accounts`,
    breadcrumb: 'Accounts',
    Component: AccountsPage,
  },
  {
    path: `${DEFAULT_PATH}/`,
    breadcrumb: 'Management',
    Component: AccountManagementPage,
  },
];

export const roleRoutes = [
  {
    path: `${DEFAULT_PATH}/roles`,
    breadcrumb: 'Roles',
    Component: RolesPage,
  },
];

export const tenantRoutes = [
  {
    path: `${DEFAULT_PATH}/tenants`,
    breadcrumb: 'Tenants',
    Component: TenantsPage,
  },
];

export const sidebarAccountManagements : {
  path: string;
  label: string,
  icon: JSX.Element,
  iconActive: JSX.Element,
  routes: {
    path: string,
    label: string,
    iconMini: JSX.Element,
  }[]
} = {
  path: '/',
  label: 'Management',
  icon: <IconAccountManagement />,
  iconActive: <IconAccountManagement />,
  routes: [],
};

export const sidebarRoles = {
  path: `${DEFAULT_PATH}/roles`,
  label: 'Roles',
  iconMini: <IconAccountManagement />,
};

export const sidebarAccounts = {
  path: `${DEFAULT_PATH}/accounts`,
  label: 'Accounts',
  iconMini: <IconAccountManagement />,
};

export const sidebarTenants = {
  path: `${DEFAULT_PATH}/tenants`,
  label: 'Tenants',
  iconMini: <IconAccountManagement />,
};
