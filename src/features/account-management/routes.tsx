import { ReactComponent as IconAccountManagement } from '../../assets/icons/icon-account-management.svg';

import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';
import EditAccount from './components/EditAccount/EditAccount';

import AccountsPage from './AccountsPage';

import CreateTenant from './components/CreateTenant/CreateTenant';
import { TenantsPage } from './TenantsPage';

export const accountManagementRoutes = [
  {
    path: '/accounts/add',
    breadcrumb: 'Add new account',
    Component: CreateAccount,
  },
  {
    path: '/accounts/edit/:id',
    breadcrumb: 'Edit an account',
    Component: EditAccount,
  },
  {
    path: '/tenants/add',
    breadcrumb: 'Add new tenant',
    Component: CreateTenant,
  },

];

export const accountRoutes = [
  {
    path: '/accounts',
    breadcrumb: 'Accounts',
    Component: AccountsPage,
  },
];

export const roleRoutes = [
  {
    path: '/roles',
    breadcrumb: 'Roles',
    Component: RolesPage,
  },
];

export const tenantRoutes = [
  {
    path: '/tenants',
    breadcrumb: 'Tenants',
    Component: TenantsPage,
  },
];

export const sidebarRoles = {
  path: '/roles',
  label: 'Roles',
  iconMini: <IconAccountManagement />,
};

export const sidebarAccounts = {
  path: '/accounts',
  label: 'Accounts',
  iconMini: <IconAccountManagement />,
};

export const sidebarTenants = {
  path: '/tenants',
  label: 'Tenants',
  iconMini: <IconAccountManagement />,
};
