/* eslint-disable react/jsx-no-constructed-context-values */
/// <reference types="cypress" />

import '@tourmalinecore/react-tc-ui-kit/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-table-responsive/es/index.css';
import 'react-toastify/ReactToastify.min.css';

// custom commands
import './commands';

// styles
import '../../src/styles/index.scss';

// env-config
import '../env-config';

import { ReactNode } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { MountReturn, mount, MountOptions } from 'cypress/react';

import AccessBasedOnPemissionsState, { Permission } from '../../src/routes/state/AccessBasedOnPemissionsState';
import AccessBasedOnPemissionsStateContext from '../../src/routes/state/AccessBasedOnPemissionsStateContext';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add('mount', (component, options: MountOptions & { routerProps?: MemoryRouterProps } = {}) => {
  const {
    routerProps = {
      initialEntries: ['/'],
    },
    ...mountOptions
  } = options;

  const accessBasedOnPemissionsState = new AccessBasedOnPemissionsState();

  accessBasedOnPemissionsState.checkPermissionFromToken(Object.keys(Permission) as Array<keyof typeof Permission>);

  const wrapped = (
    <MemoryRouter {...routerProps}>
      <AccessBasedOnPemissionsStateContext.Provider value={accessBasedOnPemissionsState}>
        {component}
      </AccessBasedOnPemissionsStateContext.Provider>
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
});
