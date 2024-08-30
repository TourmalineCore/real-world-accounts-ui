import { makeAutoObservable } from 'mobx';

class AccountManagementState {
  private _allAccounts: Accounts[] = [];

  private _lastBlockAccount: Accounts | null = null;

  private _lastBlockAccontIndex: number | null = null;

  private _filterTerm = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  get allAccounts() {
    return this._allAccounts
      .slice()
      .filter((employee) => getFiltering(employee, this._filterTerm));
  }

  get filterTerm() {
    return this._filterTerm;
  }

  get accountToUnblock() {
    return this._lastBlockAccount;
  }

  updateFilterTerm(newFilterTerm: string) {
    this._filterTerm = newFilterTerm;
  }

  getAccounts(newEmployees: Accounts[]) {
    this._allAccounts = newEmployees;
  }

  blockAccount({
    accountId,
  }: {
    accountId: number;
  }) {
    this._lastBlockAccontIndex = this._allAccounts.findIndex((account) => account.id === accountId);

    this._allAccounts = this._allAccounts.map((account, index) => {
      if (index === this._lastBlockAccontIndex) {
        return { ...account, isBlocked: true };
      }

      return account;
    });

    const deletedAccount = this._allAccounts.find((account, index) => index === this._lastBlockAccontIndex);

    this._lastBlockAccount = deletedAccount || null;
  }

  unblockAccont({
    accountId,
  }: {
    accountId: number;
  }) {
    this._allAccounts = this._allAccounts.map((account) => {
      if (accountId === account.id) {
        return { ...account, isBlocked: false };
      }

      return account;
    });

    this._lastBlockAccount = null;
  }
}

export default AccountManagementState;

export function getFiltering(employee: Accounts, filterTerm: string) {
  if (filterTerm === 'active') {
    return !employee.isBlocked;
  } if (filterTerm === 'block') {
    return employee.isBlocked;
  }

  return employee;
}
