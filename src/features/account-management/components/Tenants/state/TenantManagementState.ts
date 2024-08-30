import { makeAutoObservable } from 'mobx';

export class TenantManagementState {
  private _allTenants: Tenants[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allTenants() {
    return this._allTenants
      .slice();
  }

  getTenants(newTenant: Tenants[]) {
    this._allTenants = newTenant;
  }
}
