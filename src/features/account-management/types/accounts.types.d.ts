type AccountCreate = {
  login: string;
  roleIds: number[];
};

type AccountEdit = {
  login: string;
  roles: {
    id: number;
    name: string;
    permissions: string[];
  }[]
};

type Accounts = {
  id: number;
  login: string;
  creationDate: Date | string;
  canChangeAccountState?: boolean;
  isBlocked?: boolean;
  tenantName: string;
  roles: {
    id: number;
    name: string;
    permissions: string[];
  }[];
};
