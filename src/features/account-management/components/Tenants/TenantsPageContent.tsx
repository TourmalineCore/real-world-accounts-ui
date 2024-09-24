/* eslint-disable react/no-unstable-nested-components */
import {
  useContext,
} from 'react';

import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../../../types';
import { TenantManagementStateContext } from './state/TenantManagementStateContext';

export type Row<TypeProps> = {
  original: TypeProps;
  values: TypeProps;
};

export const TenantsPageContent = observer(({
  isLoading,
}:{
  isLoading: boolean;
}) => {
  const tenantManagementState = useContext(TenantManagementStateContext);
  const navigate = useNavigate();

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      minWidth: 300,
      Cell: ({ row }: Table<Tenants>) => {
        const { name } = row.original;
        return (
          <span data-cy="tenant-table-row">
            {name}
          </span>
        );
      },
    },
  ];

  return (
    <section className="account-management-page" data-cy="tenants-page-content">
      <h1 className="heading">Tenant`s list</h1>

      <div className="account-management-page__inner">
        <div />
        <button
          type="button"
          className="account-management-page__button"
          data-cy="tenants-page-content-button"
          onClick={() => navigate('/tenants/add')}
        >
          + Add New Tenant
        </button>

      </div>

      <ClientTable
        tableId="tenant-table"
        data={tenantManagementState.allTenants}
        renderMobileTitle={(row: Row<{ name: string }>) => row.original.name}
        order={{
          id: 'name',
          desc: false,
        }}
        columns={columns}
        isLoading={isLoading}
      />

    </section>
  );
});
