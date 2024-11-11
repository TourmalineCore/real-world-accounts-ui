import { useMemo } from 'react';

import AccountManagementState from './context/AccountManagementState';
import AccountManagementStateContext from './context/AccountManagementStateContext';
import AccountsPageContent from './AccountsPageContent';

export type Row<TypeProps> = {
  original: TypeProps;
  values: TypeProps;
};

function AccountsPage() {
  const accountManagementState = useMemo(
    () => new AccountManagementState(),
    [],
  );

  return (
    <AccountManagementStateContext.Provider value={accountManagementState}>
      <AccountsPageContent />
    </AccountManagementStateContext.Provider>
  );
}

export default AccountsPage;
