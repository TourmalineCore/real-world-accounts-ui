import '../../../../../cypress/support/commands';
import RolesPageState from './RolesPageState';

const INITIAL_STATE = {
  loadedRoles: [
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
};

describe('RolesPageState', () => {
  it('SHOULD return all roles WHEN initialized', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    expect(rolesPageState.roles).to.has.lengthOf(2);
  });

  it('SHOULD add new role to the beginning of the list in edit mode WHEN adding was called', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.addNewRole();

    expect(rolesPageState.roles).to.has.lengthOf(3);
    expect(rolesPageState.roles[0].name).eq('');
    expect(rolesPageState.isInEditMode).eq(true);
    expect(rolesPageState.updatedRole!.id).eq(0);
  });

  it('SHOULD turn on edit mode for a role WHEN editing was called for it', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.editRole(2);
    expect(rolesPageState.updatedRole!.id).eq(2);
  });

  it('SHOULD apply changes to a role WHEN saving was called for it', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.editRole(2);

    rolesPageState.changeRole({
      id: 2,
      name: 'Manager',
      permissions: [],
    });

    expect(rolesPageState.updatedRole!.name).eq('Manager');
  });

  it('SHOULD reset changes to role name that is being edited WHEN editing was canceled', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    rolesPageState.editRole(2);

    expect(rolesPageState.isInEditMode).eq(true);
    expect(rolesPageState.updatedRole!.id).eq(2);

    rolesPageState.changeRole(
      {
        id: 2,
        name: 'Manager',
        permissions: [],
      },
    );
    expect(rolesPageState.updatedRole!.name).eq('Manager');

    rolesPageState.cancelRoleEditing();

    expect(rolesPageState.roles[0].name).eq('Employee');
    expect(rolesPageState.isInEditMode).eq(false);
  });

  it('SHOULD have the same object in private field WHEN editing this object', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    rolesPageState.editRole(2);

    expect(rolesPageState.isInEditMode).eq(true);
    expect(rolesPageState.updatedRole!.id).eq(2);

    expect(rolesPageState.updatedRole).to.deep.equal({
      id: 2,
      name: 'Employee',
      permissions: [],
    });
  });

  it('SHOULD change value of private field isNameFilled to true WHEN receiving valid string', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.addNewRole();

    expect(!!rolesPageState.updatedRole!.name).eq(false);

    rolesPageState.changeRole({
      id: 2,
      name: 'Employee',
      permissions: [],
    });

    expect(!!rolesPageState.updatedRole!.name).eq(true);
  });
});
