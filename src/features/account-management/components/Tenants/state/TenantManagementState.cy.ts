import '../../../../../../cypress/support/commands';
import { TenantManagementState } from './TenantManagementState';

const INITIAL_STATE: Tenants[] = [{
  id: 1,
  name: 'Blue',
},
{
  id: 2,
  name: 'Black',
},
];

describe('TenantManagementState', () => {
  it('SHOULD return all tenants WHEN initialized', () => {
    const tenantManagementState = new TenantManagementState();

    tenantManagementState.getTenants(INITIAL_STATE);

    expect(tenantManagementState.allTenants).to.has.lengthOf(2);
  });
});
