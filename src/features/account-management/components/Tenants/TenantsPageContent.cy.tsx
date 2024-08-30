/* eslint-disable react/jsx-no-constructed-context-values */
import '../../../../../cypress/support/commands';
import { TenantManagementState } from './state/TenantManagementState';
import { TenantManagementStateContext } from './state/TenantManagementStateContext';
import { TenantsPageContent } from './TenantsPageContent';

const initialData: Tenants[] = [{
  id: 1,
  name: 'Blue',
},
{
  id: 2,
  name: 'Black',
},
];

describe('TenantsPageContent', () => {
  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  THEN render tenants page content `, () => {
    mountComponent({
      tenants: initialData,
    });

    cy.getByData('tenants-page-content')
      .should('exist');
  });

  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  THEN render button `, () => {
    mountComponent({
      tenants: initialData,
    });

    cy.getByData('tenants-page-content-button')
      .should('exist')
      .should('have.text', '+ Add New Tenant');
  });

  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  THEN render table with data `, () => {
    context('desctop resolution', () => {
      cy.viewport(2400, 780);
      mountComponent({
        tenants: initialData,
      });

      cy.getByData('tenant-table-row')
        .should('exist')
        .first()
        .should('have.text', 'Black');

      cy.getByData('tenant-table-row')
        .should('exist')
        .last()
        .should('have.text', 'Blue');
    });
  });
});

function mountComponent({
  tenants,
}: {
  tenants: Tenants[];
}) {
  const tenantManagementState = new TenantManagementState();

  tenantManagementState.getTenants(tenants);
  cy.mount(
    <TenantManagementStateContext.Provider value={tenantManagementState}>
      <TenantsPageContent isLoading={false} />
    </TenantManagementStateContext.Provider>,

  );
}
