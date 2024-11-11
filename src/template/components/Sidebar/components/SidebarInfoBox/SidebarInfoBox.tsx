import { ReactComponent as IconPersonalProfile } from '../../../../../assets/icons/icon-personal-profile.svg';

export function SidebarInfoBox({
  name,
}: {
  name: string;
}) {
  return (
    <div className="sidebar-infobox">
      <div className="sidebar-infobox__image">
        <IconPersonalProfile />
      </div>
      <div className="sidebar-infobox__col" data-cy="sidebar-infobox">
        <div className="sidebar-infobox__name">{name.charAt(0).toUpperCase() + name.slice(1)}</div>
      </div>
    </div>
  );
}
