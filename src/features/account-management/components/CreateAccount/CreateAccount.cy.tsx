import '../../../../../cypress/support/commands';
import { API_ROOT } from '../../../../common/config/config';
import CreateAccount from './CreateAccount';

const START_ROOT = `${API_ROOT}/tenants/all`;
const START_ROOT_ROLES = `${API_ROOT}/roles`;

const MOCK_DATA: Tenants[] = [{
  id: 1,
  name: 'Blue',
},
{
  id: 2,
  name: 'Black',
},
];

const MOCK_DATA_ROLES = [
  {
    id: 1,
    name: 'CEO',
    permissions: ['ViewPersonalProfile', 'EditPersonalProfile', 'ViewContacts'],
  },
];

describe('Create Account', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      START_ROOT,
      MOCK_DATA,
    );

    cy.intercept(
      'GET',
      START_ROOT_ROLES,
      MOCK_DATA_ROLES,
    );

    mountComponent();
  });

  it(`
  GIVEN create account page 
  WHEN visit account page
  THEN render account page content `, () => {
    mountComponent();

    cy.getByData('create-account-page')
      .should('exist');
    cy.getByData('create-account-page-input-email')
      .should('exist');

    cy.getByData('create-account-page-select-tenant')
      .should('exist');

    cy.getByData('create-account-page-button-cancel')
      .should('exist')
      .should('have.text', 'Cancel');

    cy.getByData('create-account-page-button-add')
      .should('exist')
      .should('have.text', 'Add');
  });
  it(`
  GIVEN create account page 
  WHEN visit account page
  THEN a select with data about tenants is rendered`, () => {
    cy.getByData('create-account-page-select-tenant')
      .should('exist')
      .select('Black');
  });
});

function mountComponent() {
  cy.mount(
    <CreateAccount />,
  );
}
