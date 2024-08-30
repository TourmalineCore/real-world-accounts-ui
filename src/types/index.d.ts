import { ReactNode } from 'react';

export interface SidebarRoutesProps {
  isWindowRedirectNecessary?: boolean;
  path: string;
  label: string;
  icon?: ReactNode;
  iconActive?: ReactNode;
  routes?: {
    isWindowRedirectNecessary?: boolean;
    path: string;
    label: string;
    iconMini: ReactNode;
  }[];
}

export type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};
