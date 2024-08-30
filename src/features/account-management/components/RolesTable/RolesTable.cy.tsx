import RolesPageState from '../../state/roles-page/RolesPageState';
import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';
import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD show role columns and no permission rows WHEN there are roles and no permissions', () => {
    mountComponent({
      permissionGroups: [],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: [],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('role-column').first().contains('Admin');
  });

  it('SHOULD show permission group rows WHEN there are permission groups and no roles or permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [],
        },
        {
          groupName: 'Employees',
          children: [],
        },
        {
          groupName: 'Analytics',
          children: [],
        },
      ],
      rolePermissions: [],
    });

    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows WHEN there are roles, permission groups, and no permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [],
        },
        {
          groupName: 'Employees',
          children: [],
        },
        {
          groupName: 'Analytics',
          children: [],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: [],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows with nested permissions WHEN there are roles, permission groups, and permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [
            { id: 'viewPersonalProfile', name: 'View personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          children: [
            { id: 'viewContacts', name: 'View contacts' },
            { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
            { id: 'editFullEmployeesData', name: 'Edit full employees data' },
          ],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: ['viewPersonalProfile'],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: ['viewContacts', 'viewSalaryAndDocumentsData', 'editFullEmployeesData'],
        },
      ],
    });

    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
    cy.getByData('permission').first().contains('View personal profile');
  });

  it('SHOULD show that the permission is checked for a role WHEN it is in the list of permissions for this role', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [
            { id: 'viewPersonalProfile', name: 'View personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          children: [
            { id: 'viewContacts', name: 'View contacts' },
            { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
            { id: 'editFullEmployeesData', name: 'Edit full employees data' },
          ],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: ['viewPersonalProfile'],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: ['viewContacts', 'viewSalaryAndDocumentsData', 'editFullEmployeesData'],
        },
      ],
    });

    cy.getByData('permission-indicator-checked')
      .first()
      .should('exist');
  });

  it('SHOULD show edit button for roles except Admin WHEN displaying roles', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [
            { id: 'viewPersonalProfile', name: 'View personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          children: [
            { id: 'viewContacts', name: 'View contacts' },
            { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
            { id: 'editFullEmployeesData', name: 'Edit full employees data' },
          ],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: [],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('role-column').last().should('contain.html', 'button');
    cy.getByData('role-column').first().should('not.contain.html', 'button');
  });

  it('SHOULD make the name input focused WHEN adding a role', () => {
    mountComponent({
      permissionGroups: [],
      rolePermissions: [
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.get<RolesPageState>('@rolesPageState')
      .then((rolesPageState) => {
        rolesPageState.addNewRole();
      });

    cy.getByData('role-name-input').should('be.focused');
  });

  it('SHOULD hide role edit buttons WHEN in edit mode', () => {
    mountComponent({
      permissionGroups: [],
      rolePermissions: [
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('edit-role-button-Employee').should('have.length', 1);

    cy.get<RolesPageState>('@rolesPageState')
      .then((rolesPageState) => {
        rolesPageState.addNewRole();
      });

    cy.getByData('edit-role-button-Employee').should('not.exist');
  });
});

function mountComponent({
  permissionGroups,
  rolePermissions,
}: {
  permissionGroups: PermissionGroup[];
  rolePermissions: Role[];
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const rolesPageState = new RolesPageState();

  rolesPageState.initialize({
    loadedRoles: rolePermissions,
  });

  cy.wrap(rolesPageState).as('rolesPageState');

  cy.mount(
    <RolesPageStateContext.Provider value={rolesPageState}>
      <RolesTable
        permissionGroups={permissionGroups}
        rolePermissions={rolesPageState.roles}
      />
    </RolesPageStateContext.Provider>,
  );
}
