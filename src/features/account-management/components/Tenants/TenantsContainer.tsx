import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { api } from '../../../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';

import { TenantsPageContent } from './TenantsPageContent';
import { TenantManagementStateContext } from './state/TenantManagementStateContext';

export const TenantsContainer = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const tenantManagementState = useContext(TenantManagementStateContext);

  useEffect(() => {
    getTenantsAsync();
  }, []);

  return (
    <TenantsPageContent isLoading={isLoading} />
  );
  async function getTenantsAsync() {
    setIsLoading(true);
    try {
      const { data } = await api.get<Tenants[]>(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`);
      tenantManagementState.getTenants(data);
    } finally {
      setIsLoading(true);
    }
  }
});
