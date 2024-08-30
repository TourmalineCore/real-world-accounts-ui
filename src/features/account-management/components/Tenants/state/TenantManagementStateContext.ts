import { createContext } from 'react';
import { TenantManagementState } from './TenantManagementState';

export const TenantManagementStateContext = createContext<TenantManagementState>(null as unknown as TenantManagementState);
