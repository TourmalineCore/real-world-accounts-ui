import { createContext } from 'react';
import AccountManagementState from './AccountManagementState';

const AccountManagementStateContext = createContext<AccountManagementState>(null as unknown as AccountManagementState);

export default AccountManagementStateContext;
