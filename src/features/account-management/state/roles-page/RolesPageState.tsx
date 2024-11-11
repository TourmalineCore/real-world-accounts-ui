import { makeAutoObservable } from 'mobx';

class RolesPageState {
  private _roles: Role[] = [];

  private _isInEditMode: boolean = false;

  private _updatedRole: Role | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initialize({
    loadedRoles,
  }: {
    loadedRoles: Role[];
  }) {
    this._roles = loadedRoles;
  }

  get roles() {
    return this._roles;
  }

  get isInEditMode() {
    return this._isInEditMode;
  }

  get updatedRole() {
    return this._updatedRole;
  }

  changeRole({
    id,
    name,
    permissions,
  }:{
    id: number;
    name: string,
    permissions: string[]
  }) {
    this._updatedRole = {
      id,
      name,
      permissions,
    };
  }

  addNewRole() {
    this._roles.unshift({
      id: 0,
      name: '',
      permissions: [],
    });

    this.editRole(0);
  }

  editRole(roleId: number) {
    const index = this._roles.map((element) => element.id).indexOf(roleId);

    this._isInEditMode = true;
    this._updatedRole = this._roles[index];
  }

  cancelRoleEditing() {
    this._roles = this._roles.filter((role) => role.id !== 0);
    this._updatedRole = null;
    this._isInEditMode = false;
  }
}

export default RolesPageState;
