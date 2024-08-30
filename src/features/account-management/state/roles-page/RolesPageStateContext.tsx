import { createContext } from 'react';
import RolesPageState from './RolesPageState';

const RolesPageStateContext = createContext<RolesPageState>(null as unknown as RolesPageState);

export default RolesPageStateContext;
