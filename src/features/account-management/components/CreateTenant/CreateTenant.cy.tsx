import '../../../../../cypress/support/commands';
import CreateTenant from './CreateTenant';

describe('TenantsPageContent', () => {
  it(`
  GIVEN create tenant page 
  WHEN visit tenants page
  THEN render tenants page content `, () => {
    mountComponent();

    cy.getByData('create-tenant-page')
      .should('exist');

    cy.getByData('create-tenant-page-input')
      .should('exist');

    cy.getByData('create-tenant-page-button-cancel')
      .should('exist')
      .should('have.text', 'Cancel');

    cy.getByData('create-tenant-page-button-add')
      .should('exist')
      .should('have.text', 'Add');
  });
});

function mountComponent() {
  cy.mount(
    <CreateTenant />,
  );
}
