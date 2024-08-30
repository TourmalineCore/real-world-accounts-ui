import { SidebarInfoBox } from './SidebarInfoBox';

const initialData = {
  name: 'admin',
};

describe('SidebarInfoBox', () => {
  it(`
  GIVEN login starts at first upper letter of the name 
  WHEN open sidebar
  THEN render correct user name
  `, () => {
    mountComponent({
      infoBoxData: initialData,
    });

    cy
      .getByData('sidebar-infobox')
      .should('have.text', 'Admin');
  });
});

function mountComponent({
  infoBoxData,
}: {
  infoBoxData: {
    photoUrl?: string;
    name: string;
    email?: string;
  };
}) {
  cy.mount(
    <SidebarInfoBox {...infoBoxData} />,
  );
}
