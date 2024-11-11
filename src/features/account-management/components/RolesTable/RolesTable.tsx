import { observer } from 'mobx-react-lite';
import React, {
  ChangeEvent, Fragment, useContext, useRef,
} from 'react';
import { CheckField } from '@tourmalinecore/react-tc-ui-kit';
import RolesPageStateContext from '../../state/roles-page/RolesPageStateContext';
import { ReactComponent as IconCheck } from '../../../../assets/icons/check.svg';
import { ReactComponent as IconUncheck } from '../../../../assets/icons/uncheck.svg';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import AccessBasedOnPemissionsStateContext from '../../../../routes/state/AccessBasedOnPemissionsStateContext';

// ToDo
// When create a new role, its object should be added to the beginning of the array using unshift method
// object should contain id, which will be sent to mobX class (to __editId field)
// when save changed to a newly created role, its id will be deleted and the object will be sent only with name and permissions list
// we will get the id from backend

// When press Edit button, the id of the role should be sent to mobX class (to __editId field)
// based on this field, we will show either inputs or spans

function RolesTable(
  {
    permissionGroups,
    rolePermissions,
  }: {
    permissionGroups: PermissionGroup[];
    rolePermissions: Role[];
  },

) {
  const rolesPageStateContext = useContext(RolesPageStateContext);
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext);

  const columnRef = useRef<HTMLTableDataCellElement>(null);

  return (

    <table data-cy="roles-table" className="roles-table">
      <thead>
        <tr>
          <td>Permissions</td>
          {rolePermissions.map(({ id, name }) => (
            <td data-cy="role-column" key={name} className="roles-table__role-column" ref={columnRef}>
              <div className="roles-table__role-column-inner">
                {
                  id === rolesPageStateContext.updatedRole?.id
                    ? (
                      <input
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        data-cy="role-name-input"
                        className="roles-table__name-input"
                        type="text"
                        onChange={(event: { target: { value: any; }; }) => {
                          rolesPageStateContext.changeRole({ ...rolesPageStateContext.updatedRole!, name: event.target.value });
                        }}
                        defaultValue={name}
                      />
                    )
                    : <span data-cy={`role-name-${name}`}>{name}</span>
                }
                {
                  accessToChanges.accessPermissions.get('ManageRoles') && (name !== 'Admin' && (!rolesPageStateContext.isInEditMode))
            && (
              <ActionsDropdown
                className="roles-table__actions-dropdown"
                tableContainerRef={columnRef}
                dataAttr={`edit-role-button-${name}`}
                actions={[{
                  text: 'Edit',
                  onClick: () => { rolesPageStateContext.editRole(id); },
                }]}
              />
            )
                }
              </div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {permissionGroups.map(({ groupName, children }) => (
          <Fragment key={groupName}>
            <tr data-cy="permission-group" className="roles-table__permission-group">
              <td colSpan={rolesPageStateContext.roles.length + 1}>{groupName}</td>
            </tr>
            {children.map(({ id, name }) => (
              <tr data-cy="permission" key={id}>
                <td>{name}</td>
                {rolePermissions.map(({ id: roleId, permissions }) => (
                  <td
                    data-cy="permission-indicator"
                    key={roleId}
                  >

                    {roleId === rolesPageStateContext.updatedRole?.id
                      ? (
                        <div className="roles-table__permission-checkbox-wrapper">
                          <CheckField
                            id={id}
                            type="checkbox"
                            defaultChecked={permissions.some((item) => item === id)}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                              const permissionsCopy = [...rolesPageStateContext.updatedRole!.permissions];
                              const permissionIndexInArray = permissionsCopy.indexOf(event.target.id);

                              if (permissionsCopy.includes(event.target.id)) {
                                permissionsCopy.splice(permissionIndexInArray, 1);
                              } else {
                                permissionsCopy.push(event.target.id);
                              }
                              rolesPageStateContext.changeRole({ ...rolesPageStateContext.updatedRole!, permissions: permissionsCopy });
                            }}
                          />
                        </div>
                      )
                      : (
                        <span>
                          {permissions.some((item) => item === id)
                            ? <IconCheck data-cy="permission-indicator-checked" />
                            : <IconUncheck data-cy="permission-indicator-unchecked" />}
                        </span>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>

  );
}

export default observer(RolesTable);
