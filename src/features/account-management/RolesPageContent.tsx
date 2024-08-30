import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { api } from '../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';
import AccessBasedOnPemissionsStateContext from '../../routes/state/AccessBasedOnPemissionsStateContext';

const PERMISSION_GROUPS = [
  {
    groupName: 'Account Management',
    children: [
      { id: 'ViewAccounts', name: 'View accounts' },
      { id: 'ManageAccounts', name: 'Manage accounts' },
      { id: 'ViewRoles', name: 'View roles' },
      { id: 'ManageRoles', name: 'Manage roles' },
      { id: 'CanManageTenants', name: 'Can Manage Tenants' },
      { id: 'IsTenantsHardDeleteAllowed', name: 'Is Tenants Hard Delete Allowed' },
    ],
  },
];

function RolesPageContent() {
  const rolesPageStateContext = useContext(RolesPageStateContext);
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="roles-page">
      <div className="roles-page__intro">
        <div className="roles-page__info">
          <h1 className="roles-page__title">Roles</h1>
          <div className="roles-page__description">
            A role provides access to predefined menus and features,
            so that depending on the privileges available in the role, an account has access to what their need.
          </div>
        </div>

        {accessToChanges.accessPermissions.get('ManageRoles') && (
          <div className="roles-page__buttons">
            {
              !rolesPageStateContext.isInEditMode
                ? (
                  <button
                    type="button"
                    data-cy="add-new-role-button"
                    className="account-management-page__button"
                    onClick={() => { rolesPageStateContext.addNewRole(); }}
                  >
                    + Add new role
                  </button>
                )
                : (
                  <>
                    <button
                      type="button"
                      data-cy="cancel-changes-button"
                      className="account-management-page__button"
                      onClick={() => { rolesPageStateContext.cancelRoleEditing(); }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      data-cy="save-changes-button"
                      className="account-management-page__button"
                      disabled={!rolesPageStateContext.updatedRole?.name}
                      onClick={() => { saveChangesToRole(); }}
                    >
                      Save Changes
                    </button>
                  </>
                )
            }
          </div>
        )}

      </div>

      <div className="roles-page__table">
        <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={PERMISSION_GROUPS} />
      </div>
    </div>
  );

  async function saveChangesToRole() {
    if (rolesPageStateContext.updatedRole?.id === 0) {
      const { name, permissions } = rolesPageStateContext.updatedRole;

      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/create`, { name, permissions });
    } else {
      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/edit`, rolesPageStateContext.updatedRole);
    }

    rolesPageStateContext.cancelRoleEditing();
    getRoles();
  }

  async function getRoles() {
    const { data } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`);

    rolesPageStateContext.initialize({ loadedRoles: data });
  }
}

export default observer(RolesPageContent);
