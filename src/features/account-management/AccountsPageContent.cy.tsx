/* eslint-disable react/jsx-no-constructed-context-values */
import AccountsPageContent from './AccountsPageContent';
import AccountManagementState from './context/AccountManagementState';
import AccountManagementStateContext from './context/AccountManagementStateContext';

const initialData: Accounts[] = [
  {
    id: 7,
    login: '1',
    creationDate: '2024-02-12T08:14:21.32782Z',
    tenantName: 'Black',
    roles: [
      {
        id: 2,
        name: 'Employee',
        permissions: [
          'ViewPersonalProfile',
          'ViewContacts',
          'ViewAccounts',
        ],
      },
    ],
    canChangeAccountState: true,
  },
  {
    id: 9,
    login: '2',
    creationDate: '2024-02-12T08:14:21.32782Z',
    tenantName: 'Blue',
    roles: [
      {
        id: 2,
        name: 'Employee',
        permissions: [
          'ViewPersonalProfile',
          'ViewContacts',
          'ViewAccounts',
        ],
      },
    ],
    canChangeAccountState: false,
  },
];

describe('AccountsPageContent', () => {
  it(`
  GIVEN accounts page 
  WHEN visit accounts page
  THEN render accounts page content `, () => {
    mountComponent({
      accounts: initialData,
    });

    cy.getByData('accounts-page-content')
      .should('exist');
  });

  it(`
    GIVEN accounts page content
    WHEN visit accounts page
    THEN render column with tenant `, () => {
    context('desctop resolution', () => {
      cy.viewport(2400, 780);
      mountComponent({
        accounts: initialData,
      });

      cy.getByData('accounts-page-tenant-column')
        .should('exist')
        .first()
        .should('have.text', 'Black');
    });
  });

  it(`
    GIVEN accounts page content
    WHEN click on actions menu
    THEN render edit, block and unblock account action if there is a solution for this`, () => {
    context('desctop resolution', () => {
      cy.viewport(2400, 780);
      mountComponent({
        accounts: initialData,
      });

      cy.get(':nth-child(2) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button')
        .click();
      cy.get('.tc-table-desktop-actions-dropdown__list')
        .should('have.not.text', 'Edit');

      cy.get(':nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button')
        .click();
      cy.get('.tc-table-desktop-actions-dropdown__list')
        .children()
        .first()
        .should('have.text', 'Edit');
      cy.get('.tc-table-desktop-actions-dropdown__list')
        .children()
        .last()
        .should('have.text', 'Block');
    });
  });
  it(`
    GIVEN accounts page content
    WHEN block account
    THEN change account's status and add actions unblock`, () => {
    context('desctop resolution', () => {
      cy.viewport(2400, 780);
      mountComponent({
        accounts: initialData,
      });

      cy.get(':nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button')
        .click();
      cy.get('.tc-table-desktop-actions-dropdown__list')
        .children()
        .last()
        .should('have.text', 'Block')
        .click();

      cy.getByData('accounts-page-status-column')
        .should('exist')
        .first()
        .should('have.text', 'Blocked');

      cy.get('#block')
        .click();
      cy.getByData('accounts-page-tenant-column')
        .should('exist')
        .should('have.length', '1')
        .should('have.text', 'Black');

      cy.get(':nth-child(1) > .tc-table-desktop__action-cell > .tc-table-desktop-actions-dropdown > .tc-table-desktop-actions-dropdown__button')
        .click();
      cy.get('.tc-table-desktop-actions-dropdown__list')
        .children()
        .should('have.text', 'Unblock')
        .click();

      cy.getByData('accounts-page-tenant-column')
        .should('have.length', '0');
    });
  });
});

function mountComponent({
  accounts,
}: {
  accounts: Accounts[];
}) {
  const accountManagementState = new AccountManagementState();

  accountManagementState.getAccounts(accounts);
  cy.mount(
    <AccountManagementStateContext.Provider value={accountManagementState}>
      <AccountsPageContent />
    </AccountManagementStateContext.Provider>,

  );
}
