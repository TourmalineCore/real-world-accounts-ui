import { useMemo } from 'react';

import { TenantsContainer } from './TenantsContainer';
import { TenantManagementState } from './state/TenantManagementState';
import { TenantManagementStateContext } from './state/TenantManagementStateContext';

export function Tenants() {
  const tenantManagementState = useMemo(
    () => new TenantManagementState(),
    [],
  );

  return (
    <TenantManagementStateContext.Provider value={tenantManagementState}>
      <TenantsContainer />
    </TenantManagementStateContext.Provider>
  );
}
